export type DropDownOptionType = {
   label: string;
   value: string;
   helper?: string;
   disable?: boolean;
   divider?: boolean;
   icon?: string;
  };
  
  export type DynamicDropDownItemtype = {
   [key: string]: unknown;
  };
  
  export type DropDownOption = DropDownOptionType &
  Partial<DynamicDropDownItemtype>;
  