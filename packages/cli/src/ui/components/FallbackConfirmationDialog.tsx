/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Modifications Copyright 2025 Vladyslav K.
 */

import { Box, Text, useInput } from 'ink';
import { Colors } from '../colors.js';
import { RadioButtonSelect } from './shared/RadioButtonSelect.js';

interface FallbackConfirmationDialogParams {
  currentModel: string;
  fallbackModel: string;
  onSelect: (confirmed: boolean) => void;
}

export function FallbackConfirmationDialog({ currentModel, fallbackModel, onSelect }: FallbackConfirmationDialogParams) {
  const options = [
    { label: `No, wait for Pro model (${currentModel})`, value: false },
    { label: `Yes, switch to Flash model (${fallbackModel})`, value: true },
  ];

  // Close dialog on the ESC button
  useInput((_input, key) => {
    if (key.escape) {
      onSelect(false);
    }
  });

  return (
    <Box flexDirection="column" padding={1} borderColor={Colors.Gray} borderStyle="round">
      <Box>
        <Text>The model <Text bold>{currentModel}</Text> takes too long to respond.</Text>
      </Box>
      <Text>Would you like to switch to the model <Text bold>{fallbackModel}</Text> and continue?</Text>
      <Box marginTop={1}>
        <RadioButtonSelect<boolean>
          items={options}
          isFocused={true}
          onSelect={onSelect}
        />
      </Box>
      <Box marginTop={1}>
        <Text color={Colors.Gray}>(Esc to cancel, Enter to select)</Text>
      </Box>
    </Box>
  );
}
