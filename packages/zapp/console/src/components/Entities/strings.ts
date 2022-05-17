import { createLocalizedString } from '@flyteconsole/locale';
import { startCase } from 'lodash';

const launchStrings = (typeString: string) => `Launch ${startCase(typeString)}`;
const noDescription = (typeString: string) => `This ${typeString} has no description.`;
const noSchedules = (typeString: string) => `This ${typeString} has no schedules.`;
const allExecutionsChartTitle = (typeString: string) =>
  `All Executions in the ${startCase(typeString)}`;
const versionsTitle = (typeString: string) => `Recent ${startCase(typeString)} Versions`;

const str = {
  viewAll: 'View All',
  schedulesHeader: 'Schedules',
  collapseButton: (showAll: boolean) => (showAll ? 'Collapse' : 'Expand'),
  launchStrings_workflow: launchStrings('Workflow'),
  launchStrings_task: launchStrings('Task'),
  noDescription_workflow: noDescription('Workflow'),
  noDescription_task: noDescription('Task'),
  noSchedules_workflow: noSchedules('Workflow'),
  noSchedules_task: noSchedules('Task'),
  allExecutionsChartTitle_workflow: allExecutionsChartTitle('Workflow'),
  allExecutionsChartTitle_task: allExecutionsChartTitle('Task'),
  versionsTitle_workflow: versionsTitle('Workflow'),
  versionsTitle_task: versionsTitle('Task'),
  details_task: 'Task Details',
  inputsFieldName: 'Inputs',
  outputsFieldName: 'Outputs',
  imageFieldName: 'Image',
  envVarsFieldName: 'Env Vars',
  commandsFieldName: 'Commands',
  empty: 'Empty',
  key: 'Key',
  value: 'Value',
  basicInformation: 'Basic Information',
  description: 'Description',
};

export { patternKey } from '@flyteconsole/locale';
export default createLocalizedString(str);
