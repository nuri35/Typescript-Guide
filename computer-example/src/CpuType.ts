export interface CPU {
  model: string;
  cores: number;
  compute: () => void;
}
