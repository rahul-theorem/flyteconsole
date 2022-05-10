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

export const backUrlGenerator: {
  [k in ResourceType]: (id: ResourceIdentifier) => string;
} = {
  [ResourceType.DATASET]: workflowListGenerator,
  [ResourceType.LAUNCH_PLAN]: workflowListGenerator,
  [ResourceType.TASK]: taskListGenerator,
  [ResourceType.UNSPECIFIED]: workflowListGenerator,
  [ResourceType.WORKFLOW]: workflowListGenerator,
};

const workflowDetailGenerator = ({ project, domain, name }: ResourceIdentifier) =>
  Routes.WorkflowDetails.makeUrl(project, domain, name);
const taskDetailGenerator = ({ project, domain, name }: ResourceIdentifier) =>
  Routes.TaskDetails.makeUrl(project, domain, name);

export const backToDetailUrlGenerator: {
  [k in ResourceType]: (id: ResourceIdentifier) => string;
} = {
  [ResourceType.DATASET]: workflowDetailGenerator,
  [ResourceType.LAUNCH_PLAN]: workflowDetailGenerator,
  [ResourceType.TASK]: taskDetailGenerator,
  [ResourceType.UNSPECIFIED]: workflowDetailGenerator,
  [ResourceType.WORKFLOW]: workflowDetailGenerator,
};
