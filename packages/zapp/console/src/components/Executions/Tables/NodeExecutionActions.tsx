import { IconButton, Dialog } from '@material-ui/core';
import { NodeExecution } from 'models/Execution/types';
import * as React from 'react';
import InputsAndOutputsIcon from '@material-ui/icons/Tv';
import RerunIcon from '@material-ui/icons/Autorenew';
import { LaunchForm } from 'components/Launch/LaunchForm/LaunchForm';
import { Identifier, ResourceIdentifier, ResourceType } from 'models/Common/types';
import { LaunchFormDialog } from 'components/Launch/LaunchForm/LaunchFormDialog';
import { NodeExecutionsTableState } from './types';
import { useNodeExecutionContext } from '../contextProvider/NodeExecutionDetails';
import { NodeExecutionDetails } from '../types';

function getLaunchProps(id: ResourceIdentifier) {
  if (id.resourceType === ResourceType.TASK) {
    return { taskId: id };
  }

  return { workflowId: id };
}

/** Renders a link that, when clicked, will trigger selection of the
 * given NodeExecution.
 */
export const NodeExecutionActions: React.FC<{
  className?: string;
  execution: NodeExecution;
  state: NodeExecutionsTableState;
}> = ({ className, execution, state }) => {
  const detailsContext = useNodeExecutionContext();

  // open the side panel for selected execution's detail
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    // prevent the parent row body onClick event trigger
    e.stopPropagation();
    // use null in case if there is no execution provided - when it is null will close panel
    state.setSelectedExecution(execution?.id ?? null);
  };

  const [showLaunchForm, setShowLaunchForm] = React.useState(false);
  const onCancelLaunch = () => setShowLaunchForm(false);
  const [details, setDetails] = React.useState<NodeExecutionDetails | undefined>();

  console.log('debugg', details);
  React.useEffect(() => {
    detailsContext.getNodeExecutionDetails(execution).then((res) => {
      setDetails(res);
    });
  }, []);

  const id: ResourceIdentifier | undefined = details?.taskTemplate?.id as
    | ResourceIdentifier
    | undefined;

  return (
    <>
      <div>
        <IconButton onClick={onClick}>
          <InputsAndOutputsIcon />
        </IconButton>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setShowLaunchForm(true);
          }}
        >
          <RerunIcon />
        </IconButton>
      </div>
      {id && (
        <LaunchFormDialog
          id={id}
          showLaunchForm={showLaunchForm}
          setShowLaunchForm={setShowLaunchForm}
        />
      )}
    </>
  );
};
