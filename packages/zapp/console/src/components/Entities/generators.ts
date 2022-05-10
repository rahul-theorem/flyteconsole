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
const unspecifiedListGenerator = ({ project, domain }: ResourceIdentifier) => '';

export const backUrlGenerator: {
  [k in ResourceType]: (id: ResourceIdentifier) => string;
} = {
  [ResourceType.DATASET]: unspecifiedListGenerator,
  [ResourceType.LAUNCH_PLAN]: unspecifiedListGenerator,
  [ResourceType.TASK]: taskListGenerator,
  [ResourceType.UNSPECIFIED]: unspecifiedListGenerator,
  [ResourceType.WORKFLOW]: workflowListGenerator,
};

const workflowDetailGenerator = ({ project, domain, name }: ResourceIdentifier) =>
  Routes.WorkflowDetails.makeUrl(project, domain, name);
const taskDetailGenerator = ({ project, domain, name }: ResourceIdentifier) =>
  Routes.TaskDetails.makeUrl(project, domain, name);
const unspecifiedDetailGenerator = ({ project, domain, name }: ResourceIdentifier) => '';

export const backToDetailUrlGenerator: {
  [k in ResourceType]: (id: ResourceIdentifier) => string;
} = {
  [ResourceType.DATASET]: unspecifiedDetailGenerator,
  [ResourceType.LAUNCH_PLAN]: unspecifiedDetailGenerator,
  [ResourceType.TASK]: taskDetailGenerator,
  [ResourceType.UNSPECIFIED]: unspecifiedDetailGenerator,
  [ResourceType.WORKFLOW]: workflowDetailGenerator,
};
