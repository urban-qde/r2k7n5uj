const paletteDefinitions = [
  {
    id: "block",
    label: "Block",
    type: "block",
    slot: "item",
    icon: "images/block.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "goalblock",
    label: "Goal Block",
    type: "goalblock",
    slot: "item",
    icon: "images/goalblock.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "balloon",
    label: "Balloon",
    type: "balloon",
    slot: "item",
    icon: "images/balloon.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "bomb",
    label: "Bomb",
    type: "bomb",
    slot: "item",
    icon: "images/bomb.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "rockethorizontal",
    label: "Rocket Horizontal",
    type: "rockethorizontal",
    slot: "item",
    icon: "images/rocket_horizontal.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "rocketvertical",
    label: "Rocket Vertical",
    type: "rocketvertical",
    slot: "item",
    icon: "images/rocket_vertical.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "bombpickup",
    label: "Bomb Pickup",
    type: "bombpickup",
    slot: "item",
    icon: "images/bomb_pickup.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "rockethorizontalpickup",
    label: "Rocket Horizontal Pickup",
    type: "rockethorizontalpickup",
    slot: "item",
    icon: "images/rocket_horizontal_pickup.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "rocketverticalpickup",
    label: "Rocket Vertical Pickup",
    type: "rocketverticalpickup",
    slot: "item",
    icon: "images/rocket_vertical_pickup.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "crate1",
    label: "Crate 1",
    type: "crate",
    slot: "item",
    icon: "images/crate1.png",
    cellType: "normal", 
    defaultData: { type: "health", health: 1 }
  },
  {
    id: "crate2",
    label: "Crate 2",
    type: "crate",
    slot: "item",
    icon: "images/crate2.png",
    cellType: "normal",
    defaultData: { type: "health", health: 2 }
  },
  {
    id: "crate3",
    label: "Crate 3",
    type: "crate",
    slot: "item",
    icon: "images/crate3.png",
    cellType: "normal",
    defaultData: { type: "health", health: 3 }
  },
  {
    id: "metalcrate1",
    label: "Metal Crate 1",
    type: "metalcrate",
    slot: "item",
    icon: "images/metal_crate1.png",
    cellType: "normal", 
    defaultData: { type: "health", health: 1 }
  },
  {
    id: "metalcrate2",
    label: "Metal Crate 2",
    type: "metalcrate",
    slot: "item",
    icon: "images/metal_crate2.png",
    cellType: "normal",
    defaultData: { type: "health", health: 2 }
  },
  {
    id: "metalcrate3",
    label: "Metal Crate 3",
    type: "metalcrate",
    slot: "item",
    icon: "images/metal_crate3.png",
    cellType: "normal",
    defaultData: { type: "health", health: 3 }
  },
  {
    id: "ice",
    label: "Ice Block",
    type: "ice",
    slot: "overlay",
    icon: "images/ice.png",
    cellType: "normal",
    defaultData: null
  },  
  {
    id: "steel",
    label: "Steel Block",
    type: "steel",
    slot: "overlay",
    icon: "images/steel.png",
    cellType: "normal",
    defaultData: null
  },  
  {
    id: "hidden",
    label: "Hidden Block",
    type: "hidden",
    slot: "overlay",
    icon: "images/hidden.png",
    cellType: "normal",
    defaultData: null
  },  
  {
    id: "void",
    label: "Void",
    type: "void",
    slot: "item",
    icon: "images/void.png",
    cellType: "void", // 🔥 Different!
    defaultData: null
  }
];
