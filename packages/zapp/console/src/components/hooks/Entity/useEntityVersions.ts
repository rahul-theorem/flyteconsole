import { IdentifierScope, Identifier } from 'models/Common/types';
import { RequestConfig } from 'models/AdminEntity/types';
import { listWorkflows } from 'models/Workflow/api';
import { Workflow } from 'models/Workflow/types';
import { Core } from 'flyteidl';
import { listTasks } from 'models/Task/api';
import { Task } from 'models/Task/types';
import { usePagination } from '../usePagination';
import { EntityType, entityFunctions } from './constants';

/**
 * A hook for fetching a paginated list of entity versions.
 * @param scope
 * @param config
 */
export function useEntityVersions(scope: IdentifierScope, config: RequestConfig) {
  return usePagination<EntityType, IdentifierScope>(
    { ...config, cacheItems: true, fetchArg: scope },
    entityFunctions[(scope as Identifier)?.resourceType ?? Core.ResourceType.UNSPECIFIED]
      .listEntity,
  );
}
