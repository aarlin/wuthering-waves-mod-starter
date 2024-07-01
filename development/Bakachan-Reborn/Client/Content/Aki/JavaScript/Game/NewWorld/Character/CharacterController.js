"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, r, a) {
		var o,
			n = arguments.length,
			i =
				n < 3
					? t
					: null === a
						? (a = Object.getOwnPropertyDescriptor(t, r))
						: a;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			i = Reflect.decorate(e, t, r, a);
		else
			for (var l = e.length - 1; 0 <= l; l--)
				(o = e[l]) && (i = (n < 3 ? o(i) : 3 < n ? o(t, r, i) : o(t, r)) || i);
		return 3 < n && i && Object.defineProperty(t, r, i), i;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterController = void 0);
const cpp_1 = require("cpp"),
	Stats_1 = require("../../../Core/Common/Stats"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	Net_1 = require("../../../Core/Net/Net"),
	ModelManager_1 = require("../../Manager/ModelManager");
class CharacterController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return (this.sBn = new Date()), !0;
	}
	static OnTick(e) {
		CharacterController.fWo() || CharacterController.pWo(),
			Net_1.Net.IsFinishLogin() && this.aBn();
	}
	static async aBn() {
		var e,
			t = new Date();
		3 <= (t.getTime() - this.sBn.getTime()) / 1e3 / 60 &&
			((this.sBn = t),
			0 < (t = cpp_1.FuncOpenLibrary.GetEBuffer()).byteLength) &&
			((e = new Uint8Array(t)),
			(e = new Uint8Array(e)),
			cpp_1.FuncOpenLibrary.FreeArrayBuffer(t),
			((t = new Protocol_1.Aki.Protocol.CombatMessage.Tms()).HVn = e),
			(e = await Net_1.Net.CallAsync(25751, t)),
			cpp_1.FuncOpenLibrary.SetIsCheckEncrypt(e?.TEs ?? ""));
	}
	static InitData(e, t, r) {
		return ModelManager_1.ModelManager.CharacterModel.InitData(e, t, r);
	}
	static Respawn(e, t, r = 0, a) {
		return ModelManager_1.ModelManager.CharacterModel.Respawn(e, t, r, a);
	}
	static AddEntityToAwakeQueue(e, t) {
		ModelManager_1.ModelManager.CharacterModel.AddEntityToAwakeQueue(e, t);
	}
	static ActivateEntity(e) {
		ModelManager_1.ModelManager.CharacterModel.ActivateEntity(e);
	}
	static Destroy(e) {
		return ModelManager_1.ModelManager.CharacterModel.Destroy(e);
	}
	static DestroyToLru(e) {
		return ModelManager_1.ModelManager.CharacterModel.DestroyToLru(e);
	}
	static CreateEntity(e, t) {
		return ModelManager_1.ModelManager.CharacterModel.CreateEntity(e, t);
	}
	static SpawnEntity(e) {
		return ModelManager_1.ModelManager.CharacterModel.SpawnEntity(e);
	}
	static GetCharacterActorComponent(e) {
		if (e?.Valid && (e = e.GetComponent(3)).Valid && e.Actor) return e;
	}
	static GetCharacterActorComponentById(e) {
		if (
			((e = EntitySystem_1.EntitySystem.Get(e)),
			e?.Valid && ((e = e.GetComponent(3)), e?.Valid))
		)
			return e;
	}
	static GetCharacter(e) {
		return e?.Valid && (e = e.GetComponent(3))?.Valid && e.Actor
			? e.Actor
			: void 0;
	}
	static GetActor(e) {
		return e?.Valid && (e = this.GetActorComponent(e)) ? e.Owner : void 0;
	}
	static GetActorByEntity(e) {
		return e?.Valid && (e = e.GetComponent(1)) ? e.Owner : void 0;
	}
	static GetActorComponent(e) {
		let t = e.Entity.GetComponent(182);
		return t || e.Entity.GetComponent(2);
	}
	static GetTsBaseCharacterByEntity(e) {
		return e.Entity.GetComponent(3)?.Actor;
	}
	static GetUeTsBaseCharacterByEntity(e) {
		if ((e = e.GetComponent(3))) return e.Actor;
	}
	static GetEntityByUeTsBaseCharacter(e) {
		return e.CharacterActorComponent.Entity;
	}
	static SetTimeDilation(e) {
		var t = ModelManager_1.ModelManager.CreatureModel;
		for (const r of t.GetAllEntities()) r.IsInit && r.Entity.SetTimeDilation(e);
		for (const r of t.DelayRemoveContainer.GetAllEntities())
			r.IsInit && r.Entity.SetTimeDilation(e);
	}
	static CN() {
		return (
			!this.vWo &&
			0 === ModelManager_1.ModelManager.CharacterModel.AwakeQueue.Size
		);
	}
	static AwakeEntity() {
		var e = ModelManager_1.ModelManager.CharacterModel;
		if (this.vWo) {
			var t = this.vWo[2];
			if (((this.vWo = void 0), t())) return;
		}
		if (e.AwakeQueue.Size)
			for (var r; (r = e.PopAwakeHandler()); )
				if ((0, r[1])()) return void (this.vWo = r);
	}
	static SortItem(e) {
		!e?.Valid ||
			2 & e.Entity.Flag ||
			e.Entity.GetComponent(0).GetRemoveState() ||
			ModelManager_1.ModelManager.CharacterModel.SortItem(e);
	}
	static OnChangeMode() {
		if (!ModelManager_1.ModelManager.GameModeModel.IsMulti)
			for (const e of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
				e.Entity.GetComponent(38)?.SwitchControl(!0);
		return !0;
	}
}
(CharacterController.IsTickEvenPausedInternal = !0),
	(CharacterController.vWo = void 0),
	(CharacterController.sBn = void 0),
	(CharacterController.fWo = () => CharacterController.CN()),
	(CharacterController.pWo = () => {
		CharacterController.AwakeEntity();
	}),
	__decorate(
		[(0, Stats_1.statDecorator)("CharacterController.AwakeEntity")],
		CharacterController,
		"AwakeEntity",
		null,
	),
	(exports.CharacterController = CharacterController);
