import { idGeneratorService, type Item } from '../interfaces'

export const items: Item[] = [
  {
    id: idGeneratorService.generateId(),
    name: 'PS5',
    sku: 'HGU-1',
    price: 500,
    currency: 'USD',
    description:
      'Powered by an eight-core AMD Zen 2 CPU and custom AMD Radeon GPU, the PS5 is offered in two models: with and without a 4K Blu-ray drive. Supporting a 120Hz video refresh, the PS5 is considerably more powerful than the PS4 and PS4 Pro.'
  },
  {
    id: idGeneratorService.generateId(),
    name: 'Nintendo Switch',
    sku: 'HGU-2',
    price: 350,
    currency: 'USD',
    description:
      'The Nintendo Switch is a hybrid video game console, consisting of a console unit, a dock, and two Joy-Con controllers. Although it is a hybrid console, Nintendo classifies it as "a home console that you can take with you on the go".'
  },
  {
    id: idGeneratorService.generateId(),
    name: 'XBOX Series X',
    sku: 'HGU-3',
    price: 400,
    currency: 'USD',
    description:
      "The Xbox Series X's console form is designed to be unobtrusive and minimalistic. It has a 15.1 cm × 15.1 cm (5.9 in × 5.9 in) footprint, is 30.1 cm (11.9 in) high, and weighs 4.45 kg (9.8 lb). Designed to sit vertically, it can also be used on its side. Its front has the main power button and an Ultra HD Blu-ray drive."
  },
  {
    id: idGeneratorService.generateId(),
    name: 'SanDisk 128 GB',
    sku: 'HGU-4',
    price: 14,
    currency: 'USD',
    description:
      'Incredible speeds in a microSD card officially licensed for the Nintendo Switch and Nintendo Switch Lite systems Spend less time waiting and more time playing with read speeds up to 100MB/s(1) and write speeds up to 90MB/s(1). Instantly add up to 128GB (1GB=1,000,000,000 bytes. Actual user storage less.) Store your downloaded games, screenshots and video captures in one place so you can travel light'
  }
]
