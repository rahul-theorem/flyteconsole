import * as React from 'react';
import { withRouteParams } from 'components/common/withRouteParams';
import { ResourceIdentifier, ResourceType } from 'models/Common/types';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { WaitForData } from 'components/common/WaitForData';
import { useProject } from 'components/hooks/useProjects';
import { StaticGraphContainer } from 'components/Workflow/StaticGraphContainer';
import { WorkflowId } from 'models/Workflow/types';
import { entitySections } from 'components/Entities/constants';
import { EntityDetailsHeader } from 'components/Entities/EntityDetailsHeader';
import { EntityVersions } from 'components/Entities/EntityVersions';
import { typeNameToEntityResource } from './constants';

const useStyles = makeStyles((_theme: Theme) => ({
  verionDetailsContatiner: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    overflow: 'hidden',
    height: `calc(100vh - ${_theme.spacing(1)}rem)`,
  },
  staticGraphContainer: {
    display: 'flex',
    height: '60%',
    width: '100%',
    flex: '1',
  },
  versionsContainer: {
    display: 'flex',
    flex: '0 1 auto',
    height: '40%',
    flexDirection: 'column',
    overflowY: 'scroll',
  },
}));

interface WorkflowVersionDetailsRouteParams {
  projectId: string;
  domainId: string;
  entityType: string;
  entityName: string;
  entityVersion: string;
}

/**
 * The view component for the Workflow Versions page
 * @param projectId
 * @param domainId
 * @param workflowName
 */
const WorkflowVersionDetailsContainer: React.FC<WorkflowVersionDetailsRouteParams> = ({
  projectId,
  domainId,
  entityType,
  entityName,
  entityVersion,
}) => {
  const workflowId = React.useMemo<WorkflowId>(
    () => ({
      resourceType: typeNameToEntityResource[entityType],
      project: projectId,
      domain: domainId,
      name: entityName,
      version: entityVersion,
    }),
    [entityType, projectId, domainId, entityName, entityVersion],
  );

  const id = workflowId as ResourceIdentifier;
  const sections = entitySections[ResourceType.WORKFLOW];
  const project = useProject(workflowId.project);
  const styles = useStyles();

  return (
    <WaitForData {...project}>
      <EntityDetailsHeader
        project={project.value}
        id={id}
        launchable={sections.launch}
        backToWorkflow
      />
      <div className={styles.verionDetailsContatiner}>
        <div className={styles.staticGraphContainer}>
          <StaticGraphContainer workflowId={workflowId} />
        </div>
        <div className={styles.versionsContainer}>
          <EntityVersions id={id} showAll />
        </div>
      </div>
    </WaitForData>
  );
};

export const EntityVersionDetails = withRouteParams<WorkflowVersionDetailsRouteParams>(
  WorkflowVersionDetailsContainer,
);
