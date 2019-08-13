import * as n from './neon';

const RelationshipTypeUnion = n.union([
  n.literal('Used'),
  n.literal('Used for validation'),
  n.literal('Used for calibration'),
  n.literal('Derived from'),
  n.literal('Generated by'),
]);

export const NodeDefinitionSchema = n.schema({
  name: 'NodeDefinition',
  required: {
    id: {
      primary: true,
      type: n.string,
    },
    name: {
      type: n.string,
    },
    classification: {
      type: n.union([
        n.literal('entity'),
        n.literal('activity'),
        n.literal('agent')
      ]),
    },
  },
  optional: {
    label: {
      type: n.string,
    },
    labelFormatString: {
      type: n.string,
    },
  },
});

export const RelationshipRuleSchema = n.relationship({
  name: 'RelationshipRule',
  source: NodeDefinitionSchema,
  target: NodeDefinitionSchema,
  required: {
    id: {
      primary: true,
      type: n.string,
    },
    type: {
      type: n.array(RelationshipTypeUnion),
    },
    cardinality: {
      type: n.union([
        n.literal('one-to-one'), 
        n.literal('one-to-many')
      ]),
    },
  },
});

export const StudySchema = n.schema({
  name: 'Study',
  required: {
    /**
     * The id.
     */
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
    /**
     * The unique id.
     */
    id: {
      primary: true,
      type: n.string,
    },
    /**
     * The id of the definition of the node.
     * 
     * FIXME
     * Beware, if the definition is deleted, then this id will no longer be valid. 
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

export const provenanceNodeTypes = NodeDefinitionSchema.required.classification.type.types.map((t) => t.value);

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

export type ProvenanceNodeType = NodeDefinition['classification'];

export type DependencyRelationship = n.TypeOf<typeof DependencyRelationshipSchema>;

export type DependencyType = DependencyRelationship['type'];

export type InformationRelationship = n.TypeOf<typeof InformationRelationshipSchema>;
