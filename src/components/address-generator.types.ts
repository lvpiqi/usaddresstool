export interface GeneratorLabels {
  title: string;
  description: string;
  regionLabel: string;
  regionAll: string;
  generate: string;
  load: string;
  copy: string;
  copyAll: string;
  save: string;
  remove: string;
  share: string;
  shared: string;
  savedTitle: string;
  savedAt: string;
  resultTitle: string;
  map: string;
  statusCopied: string;
  statusSaved: string;
  statusRemoved: string;
  statusGenerated: string;
  statusShared: string;
  statusLoaded: string;
  statusLoading: string;
  statusFailed: string;
  emptyHint?: string;
  genderLabels: {
    male: string;
    female: string;
  };
  fieldLabels: {
    lastName: string;
    firstName: string;
    gender: string;
    phone: string;
    email: string;
    street: string;
    city: string;
    stateFullName: string;
    postalCode: string;
    fullAddress: string;
  };
}

export interface GeneratorRegionOption {
  code: string;
  label: string;
}
