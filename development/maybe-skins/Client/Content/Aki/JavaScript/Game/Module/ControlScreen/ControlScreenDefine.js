"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ignoreTag =
		exports.resetCameraTag =
		exports.DEFAULT_ARM_ROTATION_RATE =
		exports.DEFAULT_COMMON_ROTATION_RATE =
			void 0);
const UE = require("ue");
(exports.DEFAULT_COMMON_ROTATION_RATE = 0.3),
	(exports.DEFAULT_ARM_ROTATION_RATE = 0.3),
	(exports.resetCameraTag = new UE.FName("ResetCamera")),
	(exports.ignoreTag = new UE.FName("IgnoreBlockCamera"));
