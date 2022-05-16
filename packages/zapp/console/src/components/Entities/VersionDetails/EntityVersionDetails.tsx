import * as React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { contentMarginGridUnits } from 'common/layout';
import { WaitForData } from 'components/common/WaitForData';
import { useTaskTemplate } from 'components/hooks/useTask';
import { ResourceIdentifier, Identifier } from 'models/Common/types';
import { compact } from 'lodash';
import { useOnlyMyExecutionsFilterState } from 'components/Executions/filters/useOnlyMyExecutionsFilterState';
import { DumpJSON } from 'components/common/DumpJSON';
import { Row } from '../Row';
import BasicTable from '../EnvVars';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    maxHeight: 500,
    overflow: 'scroll',
  },
  header: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(contentMarginGridUnits),
  },
  table: {
    marginLeft: theme.spacing(contentMarginGridUnits),
  },
}));

export interface EntityExecutionsProps {
  id: ResourceIdentifier;
}

/** The tab/page content for viewing a workflow's executions */
export const EntityVersionDetails: React.FC<EntityExecutionsProps> = ({ id }) => {
  const styles = useStyles();

  // TODO: need to be generic for supporting other type like workflow, etc.
  const templateState = useTaskTemplate(id as Identifier);

  const template = templateState?.value?.closure?.compiledTask?.template;
  const envVars = template?.container?.env;
  const image = template?.container?.image;

  return (
    <div className={styles.container}>
      <Typography className={styles.header} variant="h6">
        Task Details
      </Typography>
      <WaitForData {...templateState}>
        <div className={styles.table}>
          {image && (
            <Row key="Image" title="Image">
              {' '}
              <Typography>{image}</Typography>{' '}
            </Row>
          )}
          {envVars && (
            <Row key="envVars" title="Env vars">
              {' '}
              <BasicTable rows={envVars} />{' '}
            </Row>
          )}

          {template && (
            <Row key="commands" title="Comands">
              {' '}
              <DumpJSON value={template} />{' '}
            </Row>
          )}
        </div>
      </WaitForData>
    </div>
  );
};
