import { Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import classnames from 'classnames';
import { useCommonStyles } from 'components/common/styles';
import { WaitForData } from 'components/common/WaitForData';
import { useNamedEntity } from 'components/hooks/useNamedEntity';
import { NamedEntityMetadata, ResourceIdentifier, ResourceType } from 'models/Common/types';
import * as React from 'react';
import reactLoadingSkeleton from 'react-loading-skeleton';
import { DumpJSON } from 'components/common/DumpJSON';
import { useEntityVersions } from 'components/hooks/Entity/useEntityVersions';
import { executionSortFields } from 'models/Execution/constants';
import { SortDirection } from 'models/AdminEntity/types';
import { TaskClosure } from 'models/Task/types';
import { executionFilterGenerator, versionDetailsUrlGenerator } from './generators';
import { Row } from './Row';
import t from './strings';
import { entityStrings } from './constants';

const Skeleton = reactLoadingSkeleton;

const useStyles = makeStyles((theme: Theme) => ({
  description: {
    marginTop: theme.spacing(1),
  },
}));

const InputsAndOuputs: React.FC<{
  id: ResourceIdentifier;
}> = ({ id }) => {
  const sort = {
    key: executionSortFields.createdAt,
    direction: SortDirection.DESCENDING,
  };

  const baseFilters = React.useMemo(
    () => executionFilterGenerator[id.resourceType](id),
    [id, id.resourceType],
  );

  const versions = useEntityVersions(
    { ...id, version: '' },
    {
      sort,
      filter: baseFilters,
      limit: 1,
    },
  );

  let inputs, outputs;
  if ((versions?.value?.[0]?.closure as TaskClosure)?.compiledTask?.template) {
    const template = (versions?.value?.[0]?.closure as TaskClosure)?.compiledTask?.template;
    inputs = template?.interface?.inputs?.variables;
    outputs = template?.interface?.outputs?.variables;
  }
  return (
    <WaitForData {...versions}>
      {inputs && (
        <Row key="input" title="Inputs">
          <DumpJSON value={inputs}></DumpJSON>
        </Row>
      )}
      {outputs && (
        <Row key="output" title="Outputs">
          <DumpJSON value={outputs}></DumpJSON>
        </Row>
      )}
    </WaitForData>
  );
};
/** Fetches and renders the description for a given Entity (LaunchPlan,Workflow,Task) ID */
export const EntityDescription: React.FC<{
  id: ResourceIdentifier;
}> = ({ id }) => {
  const commonStyles = useCommonStyles();
  const styles = useStyles();
  const namedEntity = useNamedEntity(id);
  const { metadata = {} as NamedEntityMetadata } = namedEntity.value;
  const hasDescription = !!metadata.description;

  return (
    <>
      <Typography variant="h6">Description</Typography>
      <Typography variant="body2" component="span" className={styles.description}>
        <WaitForData {...namedEntity} spinnerVariant="none" loadingComponent={Skeleton}>
          <span
            className={classnames({
              [commonStyles.hintText]: !hasDescription,
            })}
          >
            {hasDescription
              ? metadata.description
              : t('noDescription', entityStrings[id.resourceType])}
          </span>
        </WaitForData>
        {id.resourceType == ResourceType.TASK && <InputsAndOuputs id={id} />}
      </Typography>
    </>
  );
};
