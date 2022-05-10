import { ResourceType } from 'models/Common/types';
import { listTasks } from 'models/Task/api';
import { listWorkflows } from 'models/Workflow/api';
import { Workflow } from 'models/Workflow/types';
import { Task } from 'models/Task/types';

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
