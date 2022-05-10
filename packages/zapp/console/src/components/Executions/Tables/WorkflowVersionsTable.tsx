import classnames from 'classnames';
import { noWorkflowVersionsFoundString } from 'common/constants';
import { useCommonStyles } from 'components/common/styles';
import { ListProps } from 'components/common/types';
import PaginatedDataList from 'components/Tables/PaginatedDataList';
import { Workflow } from 'models/Workflow/types';
import { Identifier, ResourceType } from 'models/Common/types';
import * as React from 'react';
import { useParams } from 'react-router';
import { history } from 'routes/history';
import { Routes } from 'routes/routes';
import { entityStrings } from 'components/Entities/constants';
import { useExecutionTableStyles } from './styles';
import { useWorkflowExecutionsTableState } from './useWorkflowExecutionTableState';
import { useWorkflowVersionsTableColumns } from './useWorkflowVersionsTableColumns';
import { WorkflowVersionRow } from './WorkflowVersionRow';

interface WorkflowVersionsTableProps extends ListProps<Workflow> {
  versionView?: boolean;
  resourceType: ResourceType;
}

interface WorkflowVersionRouteParams {
  entityVersion: string;
}

/**
 * Renders a table of WorkflowVersion records.
 * @param props
 * @constructor
 */
export const WorkflowVersionsTable: React.FC<WorkflowVersionsTableProps> = (props) => {
  const { value: workflows, versionView, resourceType } = props;
  const state = useWorkflowExecutionsTableState();
  const commonStyles = useCommonStyles();
  const tableStyles = useExecutionTableStyles();
  const { entityVersion } = useParams<WorkflowVersionRouteParams>();

  const columns = useWorkflowVersionsTableColumns();

  const handleClickRow = React.useCallback(
    ({ project, name, domain, version, resourceType = ResourceType.UNSPECIFIED }: Identifier) =>
      () => {
        history.push(
          Routes.EntityVersionDetails.makeUrl(
            project,
            domain,
            name,
            entityStrings[resourceType],
            version,
          ),
        );
      },
    [],
  );

  const rowRenderer = (row: Workflow) => (
    <WorkflowVersionRow
      columns={columns}
      workflow={row}
      state={state}
      versionView={versionView}
      onClick={versionView ? handleClickRow({ ...row.id, resourceType }) : undefined}
      isChecked={entityVersion === row.id.version}
      key={`workflow-version-row-${row.id.version}`}
    />
  );

  return (
    <div className={classnames(tableStyles.tableContainer, commonStyles.flexFill)}>
      <PaginatedDataList
        columns={columns}
        data={workflows}
        rowRenderer={rowRenderer}
        totalRows={workflows.length}
        showRadioButton={versionView}
        noDataString={noWorkflowVersionsFoundString}
        fillEmptyRows={false}
      />
    </div>
  );
};
