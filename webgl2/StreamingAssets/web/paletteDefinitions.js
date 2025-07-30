const paletteDefinitions = [
  {
    id: "block",
    label: "Block",
    type: "block",
    icon: "images/block.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "goalblock",
    label: "Goal Block",
    type: "goalblock",
    icon: "images/goalblock.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "bomb",
    label: "Bomb",
    type: "bomb",
    icon: "images/bomb.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "rockethorizontal",
    label: "Rocket Horizontal",
    type: "rockethorizontal",
    icon: "images/rocket_horizontal.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "rocketvertical",
    label: "Rocket Vertical",
    type: "rocketvertical",
    icon: "images/rocket_vertical.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "bombpickup",
    label: "Bomb Pickup",
    type: "bombpickup",
    icon: "images/bomb_pickup.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "rockethorizontalpickup",
    label: "Rocket Horizontal Pickup",
    type: "rockethorizontalpickup",
    icon: "images/rocket_horizontal_pickup.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "rocketverticalpickup",
    label: "Rocket Vertical Pickup",
    type: "rocketverticalpickup",
    icon: "images/rocket_vertical_pickup.png",
    cellType: "normal",
    defaultData: null
  },
  {
    id: "crate1",
    label: "Crate 1",
    type: "crate",
    icon: "images/crate1.png",
    cellType: "normal", 
    defaultData: { type: "health", health: 1 }
  },
  {
    id: "crate2",
    label: "Crate 2",
    type: "crate",
    icon: "images/crate2.png",
    cellType: "normal",
    defaultData: { type: "health", health: 2 }
  },
  {
    id: "crate3",
    label: "Crate 3",
    type: "crate",
    icon: "images/crate3.png",
    cellType: "normal",
    defaultData: { type: "health", health: 3 }
  },
  {
    id: "metalcrate1",
    label: "Metal Crate 1",
    type: "metalcrate",
    icon: "images/metal_crate1.png",
    cellType: "normal", 
    defaultData: { type: "health", health: 1 }
  },
  {
    id: "metalcrate2",
    label: "Metal Crate 2",
    type: "metalcrate",
    icon: "images/metal_crate2.png",
    cellType: "normal",
    defaultData: { type: "health", health: 2 }
  },
  {
    id: "metalcrate3",
    label: "Metal Crate 3",
    type: "metalcrate",
    icon: "images/metal_crate3.png",
    cellType: "normal",
    defaultData: { type: "health", health: 3 }
  },  
  {
    id: "void",
    label: "Void",
    type: "void",
    icon: "images/void.png",
    cellType: "void", // 🔥 Different!
    defaultData: null
  }
];
