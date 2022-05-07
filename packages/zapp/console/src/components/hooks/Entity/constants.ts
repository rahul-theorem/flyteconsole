import { ResourceType } from 'models/Common/types';
import { listTasks } from 'models/Task/api';
import { listWorkflows } from 'models/Workflow/api';
import { Workflow } from 'models/Workflow/types';
import { Task } from 'models/Task/types';
import { PaginatedFetchFn } from '../types';

type EntityStringMap = { [k in ResourceType]: string };

export const entityStrings: EntityStringMap = {
  [ResourceType.DATASET]: 'dataset',
  [ResourceType.LAUNCH_PLAN]: 'launch plan',
  [ResourceType.TASK]: 'task',
  [ResourceType.UNSPECIFIED]: 'item',
  [ResourceType.WORKFLOW]: 'workflow',
};

interface EntityFunctions {
  description?: boolean;
  executions?: boolean;
  launch?: boolean;
  listEntity?: any;
}

export type EntityType = Workflow | Task;

export const entityFunctions: { [k in ResourceType]: EntityFunctions } = {
  [ResourceType.DATASET]: {},
  [ResourceType.LAUNCH_PLAN]: {},
  [ResourceType.TASK]: {
    listEntity: listTasks,
  },
  [ResourceType.UNSPECIFIED]: {},
  [ResourceType.WORKFLOW]: {
    listEntity: listWorkflows,
  },
};
