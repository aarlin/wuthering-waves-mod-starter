"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EffectGlobal = void 0);
const Vector_1 = require("../../../Core/Utils/Math/Vector");
class EffectGlobal {}
((exports.EffectGlobal = EffectGlobal).EnableSpawnLog = !0),
	(EffectGlobal.GlobalGamePaused = !1),
	(EffectGlobal.LastCameraLocation = Vector_1.Vector.Create(0, 0, 0)),
	(EffectGlobal.CameraLocation = Vector_1.Vector.Create(0, 0, 0)),
	(EffectGlobal.HasPlayer0 = !1),
	(EffectGlobal.GlobalTimeDilation = 1),
	(EffectGlobal.AllowEffectOutPool = !0),
	(EffectGlobal.AllowEffectInPool = !0),
	(EffectGlobal.SceneObjectWaterEffectShowDebugTrace = !1),
	(EffectGlobal.CgMode = !1);
