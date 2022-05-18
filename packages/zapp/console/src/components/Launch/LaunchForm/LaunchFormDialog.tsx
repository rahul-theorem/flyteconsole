import { IconButton, Dialog } from '@material-ui/core';
import { NodeExecution } from 'models/Execution/types';
import * as React from 'react';
import InputsAndOutputsIcon from '@material-ui/icons/Tv';
import RerunIcon from '@material-ui/icons/Autorenew';
import { LaunchForm } from 'components/Launch/LaunchForm/LaunchForm';
import { Identifier, ResourceIdentifier, ResourceType } from 'models/Common/types';

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
  id: Identifier;
}> = ({ className, id }) => {
  const [showLaunchForm, setShowLaunchForm] = React.useState(false);
  const onCancelLaunch = () => setShowLaunchForm(false);

  return (
    <>
      {id && (
        <Dialog
          scroll="paper"
          maxWidth="sm"
          fullWidth={true}
          open={showLaunchForm}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <LaunchForm onClose={onCancelLaunch} {...getLaunchProps(id)} />
        </Dialog>
      )}
    </>
  );
};
