import { NodeDefinition, RelationshipRule } from 'common';
import { getValidationError } from 'common/node_modules/io-ts';

export {
  provenanceNodes,
  studies,
  informationFields,
  informationRelationships,
  dependencyRelationships,
} from './assets/web-provenance-export.json';

// ENTITIES

// Modelling and Analysis

const researchQuestion: NodeDefinition = {
  id: 'Research Question',
  classification: 'entity',
  //labelFormatString: "RQ${version}${study ? ' (' + study.source  + ')' : ''}",
  labelFormatString: 'RQ${version}',
  informationFields: ['TRACE-Token', 'Description'],
};

const assumption: NodeDefinition = {
  id: 'Assumption',
  classification: 'entity',
  //labelFormatString: "A${version}${study ? ' (' + study.source  + ')' : ''}",
  labelFormatString: 'A${version}',
  informationFields: ['TRACE-Token','Description'],
};

const requirement: NodeDefinition = {
  id: 'Requirement',
  classification: 'entity',
  //labelFormatString: "R${version}${study ? ' (' + study.source  + ')' : ''}",
  labelFormatString: 'R${version}',
  informationFields: [
    'TRACE-Token',
    'Type,None,Qualitative,Quantitative',
    'Specification (language)',
    'Description',
  ],
  showRelatedTo: true,
};

const qualitativeModel: NodeDefinition = {
  id: 'Qualitative Model',
  classification: 'entity',
  //labelFormatString: "QM${version}${study ? ' (' + study.source  + ')' : ''}",
  labelFormatString: 'QM${version}',
  informationFields: ['TRACE-Token', 'Reference', 'Description'],
};

const simulationModel: NodeDefinition = {
  id: 'Simulation Model',
  classification: 'entity',
  //labelFormatString: "SM${version}${study ? ' (' + study.source  + ')' : ''}",
  labelFormatString: 'SM${version}',
  informationFields: [
    'TRACE-Token',
    'Reference',
    'Status,Successful Validation,Successful Calibration',
    'Software',
    'Description', 
  ],
};

const simulationExperiment: NodeDefinition = {
  id: 'Simulation Experiment',
  classification: 'entity',
  //labelFormatString: "E${version}${study ? ' (' + study.source  + ')' : ''}",
  labelFormatString: 'SE${version}',
  informationFields: [
    'TRACE-Token',
    'Reference',
    'Category,Optimization,Sensitivity analysis,Perturbation,Parameter scan,Steady-state analysis,Time course analysis,Other',
    'Specification (language)',
    'Software',
    'Description'
  ],
};

const simulationData: NodeDefinition = {
  id: 'Simulation Data',
  classification: 'entity',
  //labelFormatString: "D${version}${study ? ' (' + study.source  + ')' : ''}",
  labelFormatString: 'SD${version}',
  informationFields: [
    'Reference',
    'Status,Successful Validation,Successful Calibration',
    'Description'],
  showRelatedTo: true,
};

const data: NodeDefinition = {
  id: 'Data',
  classification: 'entity',
  labelFormatString: 'D${version}',
  informationFields: [
    'Reference',
    'Description'
  ],
};

const other: NodeDefinition = {
  id: 'Other',
  classification: 'entity',
  labelFormatString: 'O${version}',
  informationFields: [
    'Reference',
    'Description'
  ],
};

// Primary Data Collection

const methodologyLiterature: NodeDefinition = {
  id: 'Methodology Literature',
  classification: 'entity',
  labelFormatString: 'ML${version}',
  informationFields: [
    'Reference',
    'Description'
  ],
};

const dataCollectionProcedure: NodeDefinition = {
  id: 'Data Collection Procedure',
  classification: 'entity',
  labelFormatString: 'CP${version}',
  informationFields: [
    'Reference',
    'Description'
  ],
};

const participantInformation: NodeDefinition = {
  id: 'Participant Information',
  classification: 'entity',
  labelFormatString: 'PI${version}',
  informationFields: [
    'Reference',
    'Description'
  ],
};

const preregistration: NodeDefinition = {
  id: 'Preregistration',
  classification: 'entity',
  labelFormatString: 'PR${version}',
  informationFields: [
    'Reference',
    'Description'
  ],
};

const ethicalApproval: NodeDefinition = {
  id: 'Ethical Approval',
  classification: 'entity',
  labelFormatString: 'E${version}',
  informationFields: [
    'Reference',
    'Description'
  ],
};

const primaryData: NodeDefinition = {
  id: 'Primary Data',
  classification: 'entity',
  labelFormatString: 'E${version}',
  informationFields: [
    'Reference',
    'Description'
  ],
};

const findings: NodeDefinition = {
  id: 'Findings',
  classification: 'entity',
  labelFormatString: 'F${version}',
  informationFields: [
    'Reference',
    'Description'
  ],
};

const analysisScripts: NodeDefinition = {
  id: 'Analysis Scripts',
  classification: 'entity',
  labelFormatString: 'AS${version}',
  informationFields: [
    'Reference',
    'Description'
  ],
};

// Secondary Data Collection

const assessmentFramework: NodeDefinition = {
  id: 'Assessment Framework',
  classification: 'entity',
  labelFormatString: 'AF${version}',
  informationFields: [
    'Reference',
    'Description'
  ],
};

const metadata: NodeDefinition = {
  id: 'Metadata',
  classification: 'entity',
  labelFormatString: 'MD${version}',
  informationFields: [
    'Reference',
    'Description'
  ],
};

const adjustedData: NodeDefinition = {
  id: 'Adjusted Data',
  classification: 'entity',
  labelFormatString: 'AD${version}',
  informationFields: [
    'Reference',
    'Description'
  ],
};

// ACTIVITIES

// Modelling and Analysis

const buildingActivity: NodeDefinition = {
  id: 'Building Simulation Model',
  //label: 'BSM',
  labelFormatString: 'bsm${version}',
  classification: 'activity',
  informationFields: ['Description'],
};

const calibratingActivity: NodeDefinition = {
  id: 'Calibrating Simulation Model',
  //label: 'CSM',
  labelFormatString: 'csm${version}',
  classification: 'activity',
  informationFields: ['Description'],
};

const validatingActivity: NodeDefinition = {
  id: 'Validating Simulation Model',
  //label: 'VSM',
  labelFormatString: 'vsm${version}',
  classification: 'activity',
  informationFields: ['Description'],
};

const analyzingActivity: NodeDefinition = {
  id: 'Analyzing Simulation Model',
  //label: 'ASM',
  labelFormatString: 'asm${version}',
  classification: 'activity',
  informationFields: ['Description'],
};

// Primary Data Collection

const designingDataCollection: NodeDefinition = {
  id: 'Designing Data Collection',
  labelFormatString: 'ddc${version}',
  classification: 'activity',
  informationFields: ['Description'],
};

const designingFollowUpDataCollection: NodeDefinition = {
  id: 'Designing Follow-Up Data Collection',
  labelFormatString: 'dfudc${version}',
  classification: 'activity',
  informationFields: ['Description'],
};

const collectingPrimaryData : NodeDefinition = {
  id: 'Collecting Primary Data',
  labelFormatString: 'cpd${version}',
  classification: 'activity',
  informationFields: ['Description'],
};

const analyzingData: NodeDefinition = {
  id: 'Analyzing Data',
  labelFormatString: 'ad${version}',
  classification: 'activity',
  informationFields: ['Description'],
};

// Secondary Data Collection

const creatingAssessmentFramework: NodeDefinition = {
  id: 'Creating Assessment Framework',
  labelFormatString: 'caf${version}',
  classification: 'activity',
  informationFields: ['Description'],
};

const refiningAssessmentFramework: NodeDefinition = {
  id: 'Refining Assessment Framework',
  labelFormatString: 'raf${version}',
  classification: 'activity',
  informationFields: ['Description'],
};

const assessingSecondaryData: NodeDefinition = {
  id: 'Assessing Secondary Data',
  labelFormatString: 'asd${version}',
  classification: 'activity',
  informationFields: ['Description'],
};

const adjustingSecondaryData: NodeDefinition = {
  id: 'Adjusting Secondary Data',
  labelFormatString: 'asd${version}',
  classification: 'activity',
  informationFields: ['Description'],
};

export const rules: RelationshipRule[] = [
  {
    id: 'simulation-experiment-was-generated-by-calibrating-activity',
    type: ['Generated by'],
    cardinality: 'one-to-one',
    source: simulationExperiment.id,
    target: calibratingActivity.id,
  },
  {
    id: 'simulation-experiment-was-generated-by-validating-activity',
    type: ['Generated by'],
    cardinality: 'one-to-one',
    source: simulationExperiment.id,
    target: validatingActivity.id,
  },
  {
    id: 'simulation-experiment-was-generated-by-analyzing-activity',
    type: ['Generated by'],
    cardinality: 'one-to-one',
    source: simulationExperiment.id,
    target: analyzingActivity.id,
  },
  {
    id: 'simulation-data-was-generated-by-calibrating-activity',
    type: ['Generated by'],
    cardinality: 'one-to-one',
    source: simulationData.id,
    target: calibratingActivity.id,
  },
  {
    id: 'simulation-data-was-generated-by-validating-activity',
    type: ['Generated by'],
    cardinality: 'one-to-one',
    source: simulationData.id,
    target: validatingActivity.id,
  },
  {
    id: 'simulation-data-was-generated-by-analyzing-activity',
    type: ['Generated by'],
    cardinality: 'one-to-one',
    source: simulationData.id,
    target: analyzingActivity.id,
  },
  {
    id: 'simulation-model-generated-by-building-activity',
    type: ['Generated by'],
    cardinality: 'one-to-one',
    source: simulationModel.id,
    target: buildingActivity.id,
  },
  {
    id: 'simulation-model-generated-by-calibrating-activity',
    type: ['Generated by'],
    cardinality: 'one-to-one',
    source: simulationModel.id,
    target: calibratingActivity.id,
  },
  {
    id: 'building-activity-used-research-question',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: buildingActivity.id,
    target: researchQuestion.id,
  },
  {
    id: 'building-activity-used-assumption',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: buildingActivity.id,
    target: assumption.id,
  },
  {
    id: 'building-activity-used-requirement',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: buildingActivity.id,
    target: requirement.id,
  },
  {
    id: 'building-activity-used-qualitative-model',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: buildingActivity.id,
    target: qualitativeModel.id,
  },
  {
    id: 'building-activity-used-simulation-model',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: buildingActivity.id,
    target: simulationModel.id,
  },
  {
    id: 'building-activity-used-simulationExperiment',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: buildingActivity.id,
    target: simulationExperiment.id,
  },
  {
    id: 'building-activity-used-simulation-data',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: buildingActivity.id,
    target: simulationData.id,
  },
  {
    id: 'calibrating-activity-used-simulation-model',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: calibratingActivity.id,
    target: simulationModel.id,
  },
  {
    id: 'calibrating-activity-used-research-question',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: calibratingActivity.id,
    target: researchQuestion.id,
  },
  {
    id: 'calibrating-activity-used-assumption',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: calibratingActivity.id,
    target: assumption.id,
  },
  {
    id: 'calibrating-activity-used-qualitative-model',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: calibratingActivity.id,
    target: qualitativeModel.id,
  },
  {
    id: 'calibrating-activity-used-requirement',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: calibratingActivity.id,
    target: requirement.id,
  },
  {
    id: 'calibrating-activity-used-simulation-data',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: calibratingActivity.id,
    target: simulationData.id,
  },
  {
    id: 'validating-activity-used-simulation-model',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: validatingActivity.id,
    target: simulationModel.id,
  },
  {
    id: 'validating-activity-used-assumption',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: validatingActivity.id,
    target: assumption.id,
  },
  {
    id: 'validating-activity-used-requirement',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: validatingActivity.id,
    target: requirement.id,
  },
  {
    id: 'validating-activity-used-simulation-data',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: validatingActivity.id,
    target: simulationData.id,
  },
  {
    id: 'analyzing-activity-used-simulation-model',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: analyzingActivity.id,
    target: simulationModel.id,
  },
  {
    id: 'analyzing-activity-used-assumption',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: analyzingActivity.id,
    target: assumption.id,
  },
  {
    id: 'analyzing-activity-used-simulation-data',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: analyzingActivity.id,
    target: simulationData.id,
  },
  // Primary Data Collection
  {
    id: 'ddc-used-rq',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: designingDataCollection.id,
    target: researchQuestion.id,
  },
  {
    id: 'ddc-used-ml',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: designingDataCollection.id,
    target: methodologyLiterature.id,
  },
  {
    id: 'ddc-used-x',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: designingDataCollection.id,
    target: other.id,
  },
  {
    id: 'cp-generated-by-ddc',
    type: ['Generated by'],
    cardinality: 'one-to-many',
    source: dataCollectionProcedure.id,
    target: designingDataCollection.id,
  },
  {
    id: 'pr-generated-by-ddc',
    type: ['Generated by'],
    cardinality: 'one-to-many',
    source: preregistration.id,
    target: designingDataCollection.id,
  },
  {
    id: 'e-generated-by-ddc',
    type: ['Generated by'],
    cardinality: 'one-to-many',
    source: ethicalApproval.id,
    target: designingDataCollection.id,
  },
  {
    id: 'dfudc-used-f',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: designingFollowUpDataCollection.id,
    target: findings.id,
  },
  {
    id: 'dfudc-used-cp',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: designingFollowUpDataCollection.id,
    target: dataCollectionProcedure.id,
  },
  {
    id: 'dfudc-used-rq',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: designingFollowUpDataCollection.id,
    target: researchQuestion.id,
  },
  {
    id: 'dfudc-used-ml',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: designingFollowUpDataCollection.id,
    target: methodologyLiterature.id,
  },
  {
    id: 'dfudc-used-x',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: designingFollowUpDataCollection.id,
    target: other.id,
  },
  {
    id: 'pr-generated-by-dfudc',
    type: ['Generated by'],
    cardinality: 'one-to-many',
    source: preregistration.id,
    target: designingFollowUpDataCollection.id,
  },
  {
    id: 'cp-generated-by-dfudc',
    type: ['Generated by'],
    cardinality: 'one-to-many',
    source: dataCollectionProcedure.id,
    target: designingFollowUpDataCollection.id,
  },
  {
    id: 'e-generated-by-dfudc',
    type: ['Generated by'],
    cardinality: 'one-to-many',
    source: ethicalApproval.id,
    target: designingFollowUpDataCollection.id,
  },
  {
    id: 'cpd-used-cp',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: collectingPrimaryData.id,
    target: dataCollectionProcedure.id,
  },
  {
    id: 'cpd-used-e',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: collectingPrimaryData.id,
    target: ethicalApproval.id,
  },
  {
    id: 'pd-generated-by-cpd',
    type: ['Generated by'],
    cardinality: 'one-to-many',
    source: primaryData.id,
    target: collectingPrimaryData.id,
  },
  {
    id: 'pi-generated-by-cpd',
    type: ['Generated by'],
    cardinality: 'one-to-many',
    source: participantInformation.id,
    target: collectingPrimaryData.id,
  },
  {
    id: 'ad-used-pr',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: analyzingData.id,
    target: preregistration.id,
  },
  {
    id: 'ad-used-pd',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: analyzingData.id,
    target: primaryData.id,
  },
  {
    id: 'as-generated-by-ad',
    type: ['Generated by'],
    cardinality: 'one-to-many',
    source: analysisScripts.id,
    target: analyzingData.id,
  },
  {
    id: 'f-generated-by-ad',
    type: ['Generated by'],
    cardinality: 'one-to-many',
    source: findings.id,
    target: analyzingData.id,
  },
  // Secondary Data Collection
  {
    id: 'caf-used-rq',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: creatingAssessmentFramework.id,
    target: researchQuestion.id,
  },
  {
    id: 'caf-used-x',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: creatingAssessmentFramework.id,
    target: other.id,
  },
  {
    id: 'af-generated-by-caf',
    type: ['Generated by'],
    cardinality: 'one-to-many',
    source: assessmentFramework.id,
    target: creatingAssessmentFramework.id,
  },
  {
    id: 'raf-used-af',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: refiningAssessmentFramework.id,
    target: assessmentFramework.id,
  },
  {
    id: 'raf-used-x',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: refiningAssessmentFramework.id,
    target: other.id,
  },
  {
    id: 'af-generated-by-raf',
    type: ['Generated by'],
    cardinality: 'one-to-many',
    source: assessmentFramework.id,
    target: refiningAssessmentFramework.id,
  },
  {
    id: 'assd-used-af',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: assessingSecondaryData.id,
    target: assessmentFramework.id,
  },
  {
    id: 'assd-used-d',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: assessingSecondaryData.id,
    target: data.id,
  },
  {
    id: 'md-generated-by-assd',
    type: ['Generated by'],
    cardinality: 'one-to-many',
    source: metadata.id,
    target: assessingSecondaryData.id,
  },
  {
    id: 'adjdsd-used-af',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: adjustingSecondaryData.id,
    target: metadata.id,
  },
  {
    id: 'adjsd-used-d',
    type: ['Used'],
    cardinality: 'one-to-many',
    source: adjustingSecondaryData.id,
    target: data.id,
  },
  {
    id: 'md-generated-by-adjsd',
    type: ['Generated by'],
    cardinality: 'one-to-many',
    source: adjustedData.id,
    target: adjustingSecondaryData.id,
  },
];

export const definitions: NodeDefinition[] = [
  researchQuestion,
  assumption,
  requirement,
  qualitativeModel,
  simulationModel,
  simulationExperiment,
  simulationData,
  data,
  other,
  buildingActivity,
  calibratingActivity,
  validatingActivity,
  analyzingActivity,
  methodologyLiterature,
  dataCollectionProcedure,
  participantInformation,
  preregistration,
  ethicalApproval,
  primaryData,
  findings,
  analysisScripts,
  designingDataCollection,
  designingFollowUpDataCollection,
  collectingPrimaryData,
  analyzingData,
  assessmentFramework,
  metadata,
  adjustedData,
  creatingAssessmentFramework,
  refiningAssessmentFramework,
  assessingSecondaryData,
  adjustingSecondaryData
];
