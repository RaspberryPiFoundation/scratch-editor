import React, {createContext, useContext, useMemo} from 'react';
import PropTypes from 'prop-types';

import {DEFAULT_LIBRARY_ASSET_HOST} from '../lib/library-asset-url.js';

export const defaultLibraryAssetConfig = {
    libraryAssetHost: DEFAULT_LIBRARY_ASSET_HOST
};

export const LibraryAssetConfigContext = createContext(defaultLibraryAssetConfig);

export const useLibraryAssetConfig = function () {
    return useContext(LibraryAssetConfigContext);
};

/**
 * Supplies library asset host for all library modals.
 * Values are expected to be fixed for the editor session (set once by the embedder).
 * @param {object} props Component props.
 * @param {React.ReactNode} props.children Child components.
 * @param {string} [props.libraryAssetHost] Base URL for library assets.
 * @returns {React.ReactElement} Context provider.
 */
export const LibraryAssetConfigProvider = ({
    children,
    libraryAssetHost
}) => {
    const value = useMemo(
        () => ({
            libraryAssetHost: libraryAssetHost || DEFAULT_LIBRARY_ASSET_HOST
        }),
        [libraryAssetHost]
    );

    return (
        <LibraryAssetConfigContext.Provider value={value}>
            {children}
        </LibraryAssetConfigContext.Provider>
    );
};

LibraryAssetConfigProvider.propTypes = {
    children: PropTypes.node,
    libraryAssetHost: PropTypes.string
};
