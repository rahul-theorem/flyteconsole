import { FilterOperation, FilterOperationName } from 'models/AdminEntity/types';
import { ResourceIdentifier, ResourceType } from 'models/Common/types';
import { Routes } from 'routes/routes';

const noFilters = () => [];

export const executionFilterGenerator: {
  [k in ResourceType]: (id: ResourceIdentifier) => FilterOperation[];
} = {
  [ResourceType.DATASET]: noFilters,
  [ResourceType.LAUNCH_PLAN]: noFilters,
  [ResourceType.TASK]: ({ name }) => [
    {
      key: 'task.name',
      operation: FilterOperationName.EQ,
      value: name,
    },
  ],
  [ResourceType.UNSPECIFIED]: noFilters,
  [ResourceType.WORKFLOW]: ({ name }) => [
    {
      key: 'workflow.name',
      operation: FilterOperationName.EQ,
      value: name,
    },
  ],
};

const workflowListGenerator = ({ project, domain }: ResourceIdentifier) =>
  Routes.ProjectDetails.sections.workflows.makeUrl(project, domain);
const taskListGenerator = ({ project, domain }: ResourceIdentifier) =>
  Routes.ProjectDetails.sections.tasks.makeUrl(project, domain);
const unspecifiedGenerator = ({ project, domain }: ResourceIdentifier) => {
  throw new Error('Unspecified Resourcetype.');
};
const unimplementedGenerator = ({ project, domain }: ResourceIdentifier) => {
  throw new Error('Method not implemented.');
};

export const backUrlGenerator: {
  [k in ResourceType]: (id: ResourceIdentifier) => string;
} = {
  [ResourceType.DATASET]: unimplementedGenerator,
  [ResourceType.LAUNCH_PLAN]: unimplementedGenerator,
  [ResourceType.TASK]: taskListGenerator,
  [ResourceType.UNSPECIFIED]: unspecifiedGenerator,
  [ResourceType.WORKFLOW]: workflowListGenerator,
};

const workflowDetailGenerator = ({ project, domain, name }: ResourceIdentifier) =>
  Routes.WorkflowDetails.makeUrl(project, domain, name);
const taskDetailGenerator = ({ project, domain, name }: ResourceIdentifier) =>
  Routes.TaskDetails.makeUrl(project, domain, name);

export const backToDetailUrlGenerator: {
  [k in ResourceType]: (id: ResourceIdentifier) => string;
} = {
  [ResourceType.DATASET]: unimplementedGenerator,
  [ResourceType.LAUNCH_PLAN]: unimplementedGenerator,
  [ResourceType.TASK]: taskDetailGenerator,
  [ResourceType.UNSPECIFIED]: unspecifiedGenerator,
  [ResourceType.WORKFLOW]: workflowDetailGenerator,
};
