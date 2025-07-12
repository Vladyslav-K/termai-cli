/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Modifications Copyright 2025 Vladyslav K.
 */

import { useState, useCallback } from 'react';

interface DialogState {
  model: string;
  resolver: (confirmed: boolean) => void;
}

export const useFallbackDialog = () => {
  const [dialog, setDialog] = useState<DialogState | null>(null);

  const requestFallbackConfirmation = useCallback((selectedModel: string): Promise<boolean> => {
    if (dialog) {
      // If dialog already opened, prevent a new request to fallback
      return Promise.resolve(false);
    }

    // Else we open dialog for confirm fallback policy
    return new Promise<boolean>((resolver) => {
      setDialog({ model: selectedModel, resolver });
    });
  }, [dialog]);

  const handleFallbackSelection = useCallback((confirmed: boolean) => {
    // After confirmation apply changes, clear state and close dialog
    if (dialog) {
      dialog.resolver(confirmed);

      setDialog(null);
    }
  }, [dialog]);

  return {
    isFallbackDialogOpen: !!dialog,
    fallbackModel: dialog?.model,
    requestFallbackConfirmation,
    handleFallbackSelection,
  };
};
