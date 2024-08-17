"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TeleportModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	GameModePromise_1 = require("../../World/Define/GameModePromise");
class TeleportModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.Yyo = void 0),
			(this.Jyo = void 0),
			(this.zyo = void 0),
			(this.Zyo = void 0),
			(this.eIo = void 0),
			(this.TeleportMode = 1),
			(this.TeleportCameraFadeStatus = void 0),
			(this.CallSource = void 0),
			(this.CheckStreamingCompletedTimerId = void 0),
			(this.CheckPhysicsCompletedTimerId = void 0),
			(this.tIo = void 0),
			(this.k6s = void 0),
			(this.oIo = void 0),
			(this.rIo = void 0);
	}
	get IsTeleport() {
		return this.Yyo;
	}
	set IsTeleport(e) {
		this.Yyo = e;
	}
	get StartPosition() {
		return this.Jyo;
	}
	set StartPosition(e) {
		this.Jyo = e;
	}
	get StartRotation() {
		return this.zyo;
	}
	set StartRotation(e) {
		this.zyo = e;
	}
	get TargetPosition() {
		return this.Zyo;
	}
	set TargetPosition(e) {
		this.Zyo = e;
	}
	get TargetRotation() {
		return this.eIo;
	}
	set TargetRotation(e) {
		this.eIo = e;
	}
	get StreamingCompleted() {
		return this.tIo;
	}
	get VoxelStreamingCompleted() {
		return this.k6s;
	}
	get TeleportFinishRequest() {
		return this.oIo;
	}
	get CgTeleportCompleted() {
		return this.rIo;
	}
	OnInit() {
		return (
			(this.Jyo = Vector_1.Vector.Create()),
			(this.Zyo = Vector_1.Vector.Create()),
			(this.zyo = Rotator_1.Rotator.Create()),
			(this.eIo = Rotator_1.Rotator.Create()),
			!(this.TeleportCameraFadeStatus = !1)
		);
	}
	OnClear() {
		return (
			(this.Jyo = void 0),
			(this.Zyo = void 0),
			(this.zyo = void 0),
			(this.eIo = void 0),
			!(this.TeleportCameraFadeStatus = !1)
		);
	}
	CreatePromise() {
		(this.tIo = new GameModePromise_1.GameModePromise()),
			(this.k6s = new GameModePromise_1.GameModePromise()),
			(this.oIo = new GameModePromise_1.GameModePromise()),
			(this.rIo = new GameModePromise_1.GameModePromise());
	}
	ResetPromise() {
		(this.tIo = void 0),
			(this.k6s = void 0),
			(this.oIo = void 0),
			(this.rIo = void 0);
	}
}
exports.TeleportModel = TeleportModel;
