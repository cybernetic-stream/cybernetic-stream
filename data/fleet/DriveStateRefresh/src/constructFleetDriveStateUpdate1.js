export default async function constructFleetDriveStateUpdate1(obj) {
	return {
		fields: {
			latitude: {
				doubleValue: obj.latitude,
			},
			longitude: {
				doubleValue: obj.longitude,
			},
			gps_as_of: {
				integerValue: Math.round(Date.now() / 1000),
			},
			shift_state: obj.shift_state
				? {
					stringValue: obj.shift_state,
				}
				: {
					nullValue: null,
				},
			speed: obj.speed
				? {
					integerValue: obj.speed,
				}
				: {
					nullValue: null,
				},
			heading: {
				integerValue: obj.heading,
			},
		},
	};
}
