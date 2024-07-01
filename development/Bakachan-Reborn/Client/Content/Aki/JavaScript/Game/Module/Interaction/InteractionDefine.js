"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.INTERACT_GUIDE_MAX_TEXT_WIDTH =
		exports.qualityColorList =
		exports.autoPickUpTag =
		exports.AUTO_PICKUP_TIME_INTERVAL =
		exports.LERP_TIME =
			void 0);
const UE = require("ue");
(exports.LERP_TIME = 500),
	(exports.AUTO_PICKUP_TIME_INTERVAL = 300),
	(exports.autoPickUpTag = new UE.FName("AutoPickUp")),
	(exports.qualityColorList = [
		new UE.LinearColor(0.4, 0.4, 0.4, 1),
		new UE.LinearColor(0.153347, 0.479167, 0.111895, 1),
		new UE.LinearColor(0.078124, 0.337532, 1.5, 1),
		new UE.LinearColor(0.308937, 0.138176, 1.3, 1),
		new UE.LinearColor(0.745404, 0.262251, 0.072272, 1),
	]),
	(exports.INTERACT_GUIDE_MAX_TEXT_WIDTH = 760);
