import React from 'react';
import {render, screen} from '@testing-library/react';

import {
    LibraryAssetConfigProvider,
    useLibraryAssetConfig
} from '../../../src/contexts/library-asset-config-context.jsx';
import {DEFAULT_LIBRARY_ASSET_HOST} from '../../../src/lib/library-asset-url';

const ConfigConsumer = () => {
    const {libraryAssetHost} = useLibraryAssetConfig();
    return (
        <div>
            <span data-testid="host">{libraryAssetHost}</span>
        </div>
    );
};

describe('LibraryAssetConfigContext', () => {
    test('consumer uses default config without a provider', () => {
        render(<ConfigConsumer />);
        expect(screen.getByTestId('host').textContent).toBe(DEFAULT_LIBRARY_ASSET_HOST);
    });

    test('provider supplies custom host', () => {
        render(
            <LibraryAssetConfigProvider
                libraryAssetHost="http://localhost:3009/api/scratch/assets"
            >
                <ConfigConsumer />
            </LibraryAssetConfigProvider>
        );
        expect(screen.getByTestId('host').textContent).toBe(
            'http://localhost:3009/api/scratch/assets'
        );
    });

    test('provider value reference is stable when props are unchanged', () => {
        const seen = [];
        const Capture = () => {
            seen.push(useLibraryAssetConfig());
            return null;
        };
        const {rerender} = render(
            <LibraryAssetConfigProvider
                libraryAssetHost="https://api.example.com/assets"
            >
                <Capture />
            </LibraryAssetConfigProvider>
        );
        const first = seen[0];
        rerender(
            <LibraryAssetConfigProvider
                libraryAssetHost="https://api.example.com/assets"
            >
                <Capture />
            </LibraryAssetConfigProvider>
        );
        expect(seen[1]).toBe(first);
    });
});
