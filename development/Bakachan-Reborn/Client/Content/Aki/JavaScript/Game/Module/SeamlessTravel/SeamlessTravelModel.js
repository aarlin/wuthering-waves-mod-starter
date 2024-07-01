"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SeamlessTravelModel = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase");
class SeamlessTravelModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.lpo = !1),
			(this._po = !1),
			(this.upo = void 0),
			(this.cpo = void 0),
			(this.mpo = void 0),
			(this.dpo = void 0),
			(this.Cpo = []),
			(this.gpo = 0),
			(this.fpo = void 0);
	}
	get IsSeamlessTravel() {
		return this.lpo;
	}
	set IsSeamlessTravel(e) {
		this._po &&
			Log_1.Log.CheckError() &&
			Log_1.Log.Error("SeamlessTravel", 30, "无缝加载中，禁止修改是否无缝加载"),
			(this.lpo = e);
	}
	get InSeamlessTraveling() {
		return this._po;
	}
	set InSeamlessTraveling(e) {
		this._po = e;
	}
	get SeamlessTravelController() {
		return this.upo;
	}
	set SeamlessTravelController(e) {
		this.upo = e;
	}
	get SeamlessTravelPlayer() {
		return this.cpo;
	}
	set SeamlessTravelPlayer(e) {
		this.cpo = e;
	}
	get SeamlessTravelCamera() {
		return this.mpo;
	}
	set SeamlessTravelCamera(e) {
		this.mpo = e;
	}
	get SeamlessTravelPlayerEntity() {
		return this.dpo;
	}
	set SeamlessTravelPlayerEntity(e) {
		this.dpo = e;
	}
	get SeamlessTravelEffectHandle() {
		return this.gpo;
	}
	set SeamlessTravelEffectHandle(e) {
		this.gpo = e;
	}
	get SeamlessTravelEffectPromise() {
		return this.fpo;
	}
	set SeamlessTravelEffectPromise(e) {
		this.fpo = e;
	}
	OnClear() {
		return this.ClearSeamlessTravelActor(), !0;
	}
	AddSeamlessTravelActor(e) {
		return e?.IsValid()
			? (this.Cpo.push(e),
				UE.KuroStaticLibrary.SetActorPermanent(e, !0, !1),
				!0)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"SeamlessTravel",
						30,
						"[AddSeamlessTravelActor] Actor Invalid",
					),
				!1);
	}
	RemoveSeamlessTravelActor(e) {
		var r;
		return e?.IsValid()
			? (0 <= (r = this.Cpo.indexOf(e)) && this.Cpo.splice(r, 1),
				UE.KuroStaticLibrary.SetActorPermanent(e, !1, !1),
				!0)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"SeamlessTravel",
						30,
						"[RemoveSeamlessTravelActor] Actor Invalid",
					),
				!1);
	}
	IsSeamlessTravelActor(e) {
		return e?.IsValid()
			? 0 <= this.Cpo.indexOf(e)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"SeamlessTravel",
						30,
						"[IsSeamlessTravelActor] Actor Invalid",
					),
				!1);
	}
	ClearSeamlessTravelActor() {
		for (const e of this.Cpo)
			e?.IsValid() && UE.KuroStaticLibrary.SetActorPermanent(e, !1, !1);
		this.Cpo.length = 0;
	}
}
exports.SeamlessTravelModel = SeamlessTravelModel;
