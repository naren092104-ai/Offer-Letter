import { useSyncExternalStore } from "react";
import { defaultDocumentData, type DocumentData } from "./brand";
import { defaultSignature, type SignatureState } from "./signature";

/**
 * In-memory (no storage) store shared between the /editor and /preview routes so
 * navigating between them never loses the entered data.
 */
export interface StudioState {
  data: DocumentData;
  hrSignature: SignatureState;
  candidateSignature: SignatureState;
}

let state: StudioState = {
  data: { ...defaultDocumentData, date: new Date().toISOString().slice(0, 10) },
  hrSignature: { ...defaultSignature },
  candidateSignature: { ...defaultSignature },
};

const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

const getSnapshot = () => state;

export function setDocumentData(updater: (d: DocumentData) => DocumentData) {
  state = { ...state, data: updater(state.data) };
  emit();
}

export function setHRSignatureState(updater: (s: SignatureState) => SignatureState) {
  state = { ...state, hrSignature: updater(state.hrSignature) };
  emit();
}

export function setCandidateSignatureState(updater: (s: SignatureState) => SignatureState) {
  state = { ...state, candidateSignature: updater(state.candidateSignature) };
  emit();
}

export function useStudio(): StudioState {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
