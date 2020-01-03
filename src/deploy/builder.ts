import {
  BuilderContext,
  BuilderOutput,
  createBuilder
} from '@angular-devkit/architect';
import { json } from '@angular-devkit/core';
import * as path from 'path';

import * as engine from '../engine/engine';
import deploy from './actions';
import { Schema } from './schema';

export type DeployBuilderOptions = Schema & json.JsonObject;

export async function execute(
  options: DeployBuilderOptions,
  context: BuilderContext,
): Promise<BuilderOutput> {
  try {
    if (!context.target) {
      throw new Error('Cannot deploy the application without a target');
    }

    const targets = context.getProjectTargets(context.target.project);

    if (
      !targets ||
      !targets.build ||
      !targets.build.options ||
      !targets.build.options.outputPath
    ) {
      throw new Error('Cannot find the project output directory');
    }

    await deploy(
      engine,
      context,
      path.join(context.workspaceRoot, targets.build.options.outputPath),
      options
    );
  } catch (e) {
    context.logger.error('❌ An error occurred when trying to deploy:');
    context.logger.error(e.message);
    return { success: false, error: e.message };
  }

  return { success: true };
}


export default createBuilder<DeployBuilderOptions, BuilderOutput>(execute);
