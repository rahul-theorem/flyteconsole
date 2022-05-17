import { render, waitFor, screen } from '@testing-library/react';
import { ResourceIdentifier } from 'models/Common/types';
import * as React from 'react';
import { createMockTask } from 'models/__mocks__/taskData';
import { createMockWorkflow } from 'models/__mocks__/workflowData';
import { Task } from 'models/Task/types';
import { Workflow } from 'models/Workflow/types';
import { projects } from 'mocks/data/projects';
import * as projectApi from 'models/Project/api';
import { MemoryRouter } from 'react-router';
import t from '../strings';
import { EntityDetails } from '../EntityDetails';
import { entityStrings } from '../constants';

jest.mock('models/Project/api');

describe('EntityDetails', () => {
  let mockWorkflow: Workflow;
  let mockTask: Task;

  // mock api for listProjects
  const mockListProjects = jest.spyOn(projectApi, 'listProjects');
  mockListProjects.mockResolvedValue([projects['flyteTest']]);

  const createMocks = () => {
    mockWorkflow = createMockWorkflow('MyWorkflow');
    mockTask = createMockTask('MyTask');
  };

  const renderDetails = (id: ResourceIdentifier) => {
    return render(
      <MemoryRouter>
        <EntityDetails id={id} />
      </MemoryRouter>,
    );
  };

  beforeEach(() => {
    createMocks();
  });

  const checkTextInDetailPage = async (id: ResourceIdentifier) => {
    // check text for header
    await waitFor(() => {
      expect(screen.getByText(`${id.domain} / ${id.name}`)).toBeInTheDocument();
    });

    // check text for version
    await waitFor(() => {
      expect(
        screen.getByText(t('versionsTitle', entityStrings[id.resourceType])),
      ).toBeInTheDocument();
    });

    // check text for executions
    await waitFor(() => {
      expect(
        screen.getByText(t('allExecutionsChartTitle', entityStrings[id.resourceType])),
      ).toBeInTheDocument();
    });
  };

  it('Task Detail Page', async () => {
    const id: ResourceIdentifier = mockTask.id as ResourceIdentifier;
    renderDetails(id);
    checkTextInDetailPage(id);
  });

  it('Workflow Detail Page', async () => {
    const id: ResourceIdentifier = mockWorkflow.id as ResourceIdentifier;
    renderDetails(id);
    checkTextInDetailPage(id);
  });
});
