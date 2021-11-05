import React from 'react';
import { useDispatch } from 'react-redux'
import { Map as LeafletMap, TileLayer, Marker, Polyline, Tooltip } from 'react-leaflet';
import { ConditionalSection } from '../jsxHelpers';
import './Map.scss';

import { addMarker, removeMarker } from './mapActions';
import { useMapData } from '../storeSelectors';

export const Map = props => {
    const { distance, markers, path } = useMapData();

    const dispatch = useDispatch();

    const addItem = ({ latlng }) => dispatch(addMarker(latlng));
    const removeItem = ({ latlng }) => dispatch(removeMarker(latlng));

    return (
        <LeafletMap
            center={[53.8, 27.5]}
            zoom={6}
            maxZoom={10}
            attributionControl={true}
            zoomControl={true}
            doubleClickZoom={true}
            scrollWheelZoom={true}
            dragging={true}
            animate={true}
            easeLinearity={0.35}
            onClick={addItem}
        >
            <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
            {
                markers.map((item, idx) => 
                    <Marker 
                        key={`${item.lat}-${item.lng}`} 
                        position={item} 
                        onClick={removeItem}
                    >
                        <ConditionalSection condition={path.length && idx === 0}>
                            <Tooltip permanent>Расстояние: {`${distance} km`}</Tooltip>
                        </ConditionalSection>
                    </Marker>
                )
            }
            <ConditionalSection condition={path.length}>
                <Polyline positions={path} />
            </ConditionalSection>
        </LeafletMap>
    );    
}