import * as n from './neon';

/**
 * A comprehensive list of the types of relationships that can be formed between provenance nodes. 
 * Rules restrict the actual relationships that can be formed.
 */
export const RelationshipTypeUnion = n.union([
  n.literal('Used'),
  n.literal('Used for validation'),
  n.literal('Used for calibration'),
  n.literal('Derived from'),
  n.literal('Generated by'),
]);

/**
 * This type of Neo4j node defines a type of provenance node. Each definition has a name, a 
 * classification, and information about how label the node in the visualization. Because there is
 * no hierarchy in Neo4j, the `classification` attribute enables this hierarchy.
 */
export const NodeDefinitionSchema = n.schema({
  name: 'NodeDefinition',
  required: {
    id: {
      primary: true,
      type: n.string,
    },
    /**
     * The human readable name of the node.
     */
    name: {
      type: n.string,
      unique: true,
    },
    /**
     * The classification of the node. There are three different possible classifications.
     */
    classification: {
      type: n.union([
        n.literal('entity'),
        n.literal('activity'),
        n.literal('agent')
      ]),
    },
  },
  optional: {
    /**
     * The default label. If a provenance node is given no label and not format string is provided, 
     * then this label is used.
     */
    label: {
      type: n.string,
    },
    /**
     * A format string. This template string has access two three variables in it's scope, 
     * including `version` (`number`), `study` (`Study | undefined`) and `node` (`ProvenanceNode`). 
     * The `version` is a integer (starting at `1`) that is unique to the node type within the 
     * study. It is computed using an algorithm that gives a higher number to a node that has more
     * dependencies. If a node does not have a type, it's version number will be set to `0`. An 
     * example template string: `M${version}${study ? ' (' + study.source  + ')' : ''}`. If an 
     * error occurs during the evaluation of the template string, then it is ignored and the next 
     * means to label the node is used.
     * 
     * The following text visualizes an example provenance graph. Each node if either of type `A` 
     * or type `B`. The number that follows each type is a unique identifier.
     * 
     *      ┌── B1
     *      v
     *  ┌── A1
     *  │   ʌ
     *  v   └── A2
     *  A3
     *  ʌ   ┌── B2
     *  │   v
     *  └── B3
     *      ʌ
     *      └── A4
     *          ʌ
     *          └── B4
     * 
     * The `version` numbers for each node are as follows:
     * B1/B3 (0 `B` dependencies each): 1 or 2
     * B2/B4 (1 `B` dependency each): 3 or 4
     * A3 (0 `A` dependencies): 1
     * A1/A4 (1 `A` dependency each): 2 or 3
     * A2 (2 `A` dependencies): 4
     * 
     * 
     * See [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) 
     * for more information about template strings.
     */
    labelFormatString: {
      type: n.string,
    },
  },
});

/**
 * Each rule describes a relationship that can be formed between types of nodes.
 */
export const RelationshipRuleSchema = n.schema({
  name: 'RelationshipRule',
  required: {
    id: {
      primary: true,
      type: n.string,
    },
    /**
     * The type of the relationship between two nodes. Although all types are technically possible, 
     * rules restrict which types are actually allowed to be made.
     */
    type: {
      type: n.array(RelationshipTypeUnion),
    },
    /**
     * The cardinality of the relationship.
     * 
     * FIXME I don't think this information is actually used when the relationship is validated.
     */
    cardinality: {
      type: n.union([
        n.literal('one-to-one'), 
        n.literal('one-to-many')
      ]),
    },
    /**
     * The definition ID of the source.
     */
    source: {
      type: n.string,
    },
    /**
     * The definition ID of the target.
     */
    target: {
      type: n.string,
    }
  },
});

export const StudySchema = n.schema({
  name: 'Study',
  required: {
    id: {
      primary: true,
      type: n.string,
    },
  },
  optional: {
    /**
     * The signaling pathway information.
     */
    signalingPathway: {
      type: n.string,
    },
    /**
     * The information regarding the source of the model. For example, `Haack et al., PLoS comp. bio. 2015`.
     */
    source: {
      type: n.string,
    },
  },
});

export const InformationFieldSchema = n.schema({
  name: 'InformationField',
  required: {
    id: {
      primary: true,
      type: n.string,
    },
    key: {
      type: n.string,
    },
    value: {
      type: n.string,
    },
  },
});

export const ProvenanceNodeSchema = n.schema({
  name: 'ProvenanceNode',
  required: {
    id: {
      primary: true,
      type: n.string,
    },
    /**
     * The id of the definition of the node.
     * 
     * FIXME If the definition is deleted, then this id will no longer be valid. 
     */
    definitionId: {
      type: n.string,
    },
  },
  optional: {
    /**
     * The study id.
     */
    studyId: {
      type: n.string,
    },
    label: {
      /**
       * The optional label.
       */
      type: n.string,
    },
  },
});

export const InformationRelationshipSchema = n.relationship({
  name: 'HAS_INFORMATION',
  source: ProvenanceNodeSchema,
  target: InformationFieldSchema,
  required: {
    id: {
      primary: true,
      type: n.string,
    },
  },
});

export const DependencyRelationshipSchema = n.relationship({
  name: 'DEPENDS',
  source: ProvenanceNodeSchema,
  target: ProvenanceNodeSchema,
  required: {
    id: {
      primary: true,
      type: n.string,
    },
    type: {
      type: RelationshipTypeUnion,
    },
  },
});

export type ProvenanceNode = n.TypeOf<typeof ProvenanceNodeSchema>;

export type InformationField = n.TypeOf<typeof InformationFieldSchema>;

export type Study = n.TypeOf<typeof StudySchema>;

export type NodeDefinition = n.TypeOf<typeof NodeDefinitionSchema>;

export type RelationshipRule = n.TypeOf<typeof RelationshipRuleSchema>;

export type ProvenanceNodeClassification = NodeDefinition['classification'];

export type DependencyRelationship = n.TypeOf<typeof DependencyRelationshipSchema>;

export type DependencyType = DependencyRelationship['type'];

export type InformationRelationship = n.TypeOf<typeof InformationRelationshipSchema>;
