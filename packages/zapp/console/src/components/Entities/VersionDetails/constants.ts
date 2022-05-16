import { ResourceType } from 'models/Common/types';

interface VersionsDetailsSectionsFlags {
  description: boolean;
  graph: boolean;
}

export const versionsDetailsSections: { [k in ResourceType]: VersionsDetailsSectionsFlags } = {
  [ResourceType.DATASET]: {
    description: false,
    graph: false,
  },
  [ResourceType.LAUNCH_PLAN]: {
    description: false,
    graph: false,
  },
  [ResourceType.TASK]: {
    description: true,
    graph: false,
  },
  [ResourceType.UNSPECIFIED]: {
    description: false,
    graph: false,
  },
  [ResourceType.WORKFLOW]: {
    description: false,
    graph: true,
  },
};
