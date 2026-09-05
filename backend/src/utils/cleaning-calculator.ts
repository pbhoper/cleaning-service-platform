export interface RoomCounts {
  smallRooms: number;
  largeRooms: number;
  bathrooms: number;
}

export interface PricingConfig {
  basePrices: {
    smallRoom: number;
    largeRoom: number;
    bathroom: number;
  };
  baseTimesMinutes: {
    smallRoom: number;
    largeRoom: number;
    bathroom: number;
  };
  coefficients: Record<string, number>;
}

export const DEFAULT_PRICING_CONFIG: PricingConfig = {
  basePrices: {
    smallRoom: 800,
    largeRoom: 1200,
    bathroom: 1500,
  },
  baseTimesMinutes: {
    smallRoom: 30,
    largeRoom: 45,
    bathroom: 60,
  },
  coefficients: {
    'Стандартная уборка помещений': 1.0,
    'Генеральная уборка': 1.5,
    'Уборка после ремонта и строительства': 2.0,
    'Химчистка ковров': 1.2,
    'Уборка офисов': 1.3,
    'Химчистка мебели и покрытий': 1.4,
    'Промышленная уборка': 2.2,
    'Уборка бассейна': 2.5,
  },
};

export function calculateCleaning(
  rooms: RoomCounts,
  serviceType: string,
  config: PricingConfig = DEFAULT_PRICING_CONFIG,
) {
  const coeff = config.coefficients[serviceType] ?? 1.0;

  const basePrice =
    (rooms.bathrooms || 0) * config.basePrices.bathroom +
    (rooms.smallRooms || 0) * config.basePrices.smallRoom +
    (rooms.largeRooms || 0) * config.basePrices.largeRoom;

  const baseTime =
    (rooms.bathrooms || 0) * config.baseTimesMinutes.bathroom +
    (rooms.smallRooms || 0) * config.baseTimesMinutes.smallRoom +
    (rooms.largeRooms || 0) * config.baseTimesMinutes.largeRoom;

  const totalPrice = Math.round(basePrice * coeff);
  const totalTimeMinutes = Math.round(baseTime * coeff);

  const hours = Math.floor(totalTimeMinutes / 60);
  const minutes = totalTimeMinutes % 60;

  let formattedTime = '';
  if (hours > 0 && minutes > 0) {
    formattedTime = `${hours} ч. ${minutes} мин.`;
  } else if (hours > 0) {
    formattedTime = `${hours} ч.`;
  } else {
    formattedTime = `${minutes} мин.`;
  }

  return { totalPrice, totalTimeMinutes, formattedTime };
}
