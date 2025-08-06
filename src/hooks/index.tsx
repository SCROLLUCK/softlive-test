import React, { type ComponentProps, type ComponentType, type FC } from "react";

import { ProductProvider } from "./useProducts";
import { TableProvider } from "./useTable";
import { CategoryProvider } from "./useCategories";

type Providers = [ComponentType<any>, ComponentProps<any>?][];

interface IProps {
  children: React.ReactNode;
}

const combineProviders = (providers: Providers): FC<IProps> =>
  providers.reduce(
    (AccumulatedProviders, [Provider, props = {}]) =>
      ({ children }) =>
        (
          <AccumulatedProviders>
            <Provider {...props}>{children}</Provider>
          </AccumulatedProviders>
        ),
    ({ children }) => <>{children}</>
  );

export const AllProviders = combineProviders([
  [TableProvider],
  [CategoryProvider],
  [ProductProvider],
]);

function AppProvider({ children }: IProps) {
  return <AllProviders>{children}</AllProviders>;
}

export default AppProvider;
