import { MergeDeep } from "type-fest";
import { Database as DatabaseGenerated } from "./database-generated.types";

type Feature = {
  name: string;
};

export type Database = MergeDeep<
  DatabaseGenerated,
  {
    public: {
      Views: {
        products_view: {
          Row: {
            features: Feature[] | null;
          };
        };
      };
    };
  }
>;
