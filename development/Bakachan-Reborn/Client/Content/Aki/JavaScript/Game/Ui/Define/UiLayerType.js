"use strict";
var ELayerType;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MULTIPLE_VIEW_TYPE =
		exports.BLOCKCLICK_TYPE =
		exports.UIBLUR_TYPE =
		exports.IGNORE_MASK_TYPE =
		exports.NORMAL_CONTAINER_TYPE =
		exports.BATTLE_VIEW_UNIT_COUNT =
		exports.TIP_LAYER_UNIT_COUNT =
		exports.LayerTypeEnumValues =
		exports.ELayerType =
			void 0),
	(function (e) {
		(e[(e.HUD = 1)] = "HUD"),
			(e[(e.Normal = 2)] = "Normal"),
			(e[(e.NormalMask = 4)] = "NormalMask"),
			(e[(e.BattleFloat = 8)] = "BattleFloat"),
			(e[(e.Pop = 16)] = "Pop"),
			(e[(e.Float = 32)] = "Float"),
			(e[(e.Guide = 64)] = "Guide"),
			(e[(e.Loading = 128)] = "Loading"),
			(e[(e.NetWork = 256)] = "NetWork"),
			(e[(e.CG = 512)] = "CG"),
			(e[(e.Mask = 1024)] = "Mask"),
			(e[(e.WaterMask = 2048)] = "WaterMask"),
			(e[(e.Pool = 4096)] = "Pool"),
			(e[(e.Debug = 8192)] = "Debug");
	})((ELayerType = exports.ELayerType || (exports.ELayerType = {}))),
	(exports.LayerTypeEnumValues = Object.values(ELayerType).filter(
		(e) => "number" == typeof e,
	)),
	(exports.TIP_LAYER_UNIT_COUNT = 3),
	(exports.BATTLE_VIEW_UNIT_COUNT = 3),
	(exports.NORMAL_CONTAINER_TYPE = ELayerType.Normal | ELayerType.CG),
	(exports.IGNORE_MASK_TYPE = ELayerType.Float | ELayerType.Guide),
	(exports.UIBLUR_TYPE = ELayerType.Normal | ELayerType.Pop),
	(exports.BLOCKCLICK_TYPE = ELayerType.Normal | ELayerType.Pop),
	(exports.MULTIPLE_VIEW_TYPE = ELayerType.Float);
