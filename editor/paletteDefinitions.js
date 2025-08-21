const paletteDefinitions = [
  {
    id: "block",
    label: "Block",
    type: "block",
    itemTypeId: 1,
    slot: "item",
    icon: "images/block.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "goalblock",
    label: "Goal Block",
    type: "goalblock",
    itemTypeId: 2,
    slot: "item",
    icon: "images/goalblock.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "balloon",
    label: "Balloon",
    type: "balloon",
    itemTypeId: 10,
    slot: "item",
    icon: "images/balloon.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "bomb",
    label: "Bomb",
    type: "bomb",
    itemTypeId: 4,
    slot: "item",
    icon: "images/bomb.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "rockethorizontal",
    label: "Rocket Horizontal",
    type: "rockethorizontal",
    itemTypeId: 5,
    slot: "item",
    icon: "images/rocket_horizontal.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "rocketvertical",
    label: "Rocket Vertical",
    type: "rocketvertical",
    itemTypeId: 6,
    slot: "item",
    icon: "images/rocket_vertical.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "multiplier2x",
    label: "2x",
    type: "multiplier",
    itemTypeId: 12,
    slot: "item",
    icon: "images/2x.png",
    cellType: "normal",
    defaultData: { type: "health", health: 2 }
  },
  {
    id: "multiplier3x",
    label: "3x",
    type: "multiplier",
    itemTypeId: 12,
    slot: "item",
    icon: "images/3x.png",
    cellType: "normal",
    defaultData: { type: "health", health: 3 }
  },
  {
    id: "multiplier5x",
    label: "5x",
    type: "multiplier",
    itemTypeId: 12,
    slot: "item",
    icon: "images/5x.png",
    cellType: "normal",
    defaultData: { type: "health", health: 5 }
  },
  {
    id: "multiplierpickup2x",
    label: "2x Pickup",
    type: "multiplierpickup",
    itemTypeId: 11,
    slot: "item",
    icon: "images/2x_pickup.png",
    cellType: "normal",
    defaultData: { type: "health", health: 2 }
  },
  {
    id: "multiplierpickup3x",
    label: "3x Pickup",
    type: "multiplierpickup",
    itemTypeId: 11,
    slot: "item",
    icon: "images/3x_pickup.png",
    cellType: "normal",
    defaultData: { type: "health", health: 3 }
  },
  {
    id: "multiplierpickup5x",
    label: "5x Pickup",
    type: "multiplierpickup",
    itemTypeId: 11,
    slot: "item",
    icon: "images/5x_pickup.png",
    cellType: "normal",
    defaultData: { type: "health", health: 5 }
  },
  {
    id: "bombpickup",
    label: "Bomb Pickup",
    type: "bombpickup",
    itemTypeId: 7,
    slot: "item",
    icon: "images/bomb_pickup.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "rockethorizontalpickup",
    label: "Rocket Horizontal Pickup",
    type: "rockethorizontalpickup",
    itemTypeId: 8,
    slot: "item",
    icon: "images/rocket_horizontal_pickup.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "rocketverticalpickup",
    label: "Rocket Vertical Pickup",
    type: "rocketverticalpickup",
    itemTypeId: 9,
    slot: "item",
    icon: "images/rocket_vertical_pickup.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "crate1",
    label: "Crate 1",
    type: "crate",
    itemTypeId: 1000,
    slot: "item",
    icon: "images/crate1.png",
    cellType: "normal",
    defaultData: { type: "health", health: 1 }
  },
  {
    id: "crate2",
    label: "Crate 2",
    type: "crate",
    itemTypeId: 1000,
    slot: "item",
    icon: "images/crate2.png",
    cellType: "normal",
    defaultData: { type: "health", health: 2 }
  },
  {
    id: "crate3",
    label: "Crate 3",
    type: "crate",
    itemTypeId: 1000,
    slot: "item",
    icon: "images/crate3.png",
    cellType: "normal",
    defaultData: { type: "health", health: 3 }
  },
  {
    id: "metalcrate1",
    label: "Metal Crate 1",
    type: "metalcrate",
    itemTypeId: 1001,
    slot: "item",
    icon: "images/metal_crate1.png",
    cellType: "normal",
    defaultData: { type: "health", health: 1 }
  },
  {
    id: "metalcrate2",
    label: "Metal Crate 2",
    type: "metalcrate",
    itemTypeId: 1001,
    slot: "item",
    icon: "images/metal_crate2.png",
    cellType: "normal",
    defaultData: { type: "health", health: 2 }
  },
  {
    id: "metalcrate3",
    label: "Metal Crate 3",
    type: "metalcrate",
    itemTypeId: 1001,
    slot: "item",
    icon: "images/metal_crate3.png",
    cellType: "normal",
    defaultData: { type: "health", health: 3 }
  },
  {
    id: "ice",
    label: "Ice Block",
    type: "ice",
    itemTypeId: 2000,
    slot: "overlay",
    icon: "images/ice.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "steel",
    label: "Steel Block",
    type: "steel",
    itemTypeId: 2002,
    slot: "overlay",
    icon: "images/steel.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "hidden",
    label: "Hidden Block",
    type: "hidden",
    itemTypeId: 2001,
    slot: "overlay",
    icon: "images/hidden.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "void",
    label: "Void",
    type: "void",
    itemTypeId: 0,
    slot: "item",
    icon: "images/void.png",
    cellType: "void", // 🔥 Different!
    defaultData: null
  }
];
