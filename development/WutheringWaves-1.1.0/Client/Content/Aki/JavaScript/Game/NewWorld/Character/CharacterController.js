"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, r, a) {
		var o,
			n = arguments.length,
			i =
				n < 3
					? e
					: null === a
						? (a = Object.getOwnPropertyDescriptor(e, r))
						: a;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			i = Reflect.decorate(t, e, r, a);
		else
			for (var c = t.length - 1; 0 <= c; c--)
				(o = t[c]) && (i = (n < 3 ? o(i) : 3 < n ? o(e, r, i) : o(e, r)) || i);
		return 3 < n && i && Object.defineProperty(e, r, i), i;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterController = void 0);
const cpp_1 = require("cpp"),
	Stats_1 = require("../../../Core/Common/Stats"),
	NetDefine_1 = require("../../../Core/Define/Net/NetDefine"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	Net_1 = require("../../../Core/Net/Net"),
	ModelManager_1 = require("../../Manager/ModelManager");
class CharacterController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return (this.FCn = new Date()), !0;
	}
	static OnTick(t) {
		CharacterController.rHr() || CharacterController.oHr(),
			Net_1.Net.IsDoingOrFinishLogin() && this.VCn();
	}
	static async VCn() {
		var t,
			e = new Date();
		3 <= (e.getTime() - this.FCn.getTime()) / 1e3 / 60 &&
			((this.FCn = e),
			0 < (e = cpp_1.FuncOpenLibrary.GetEBuffer()).byteLength) &&
			((t = new Uint8Array(e)),
			(t = new Uint8Array(t)),
			cpp_1.FuncOpenLibrary.FreeArrayBuffer(e),
			((e =
				new Protocol_1.Aki.Protocol.CombatMessage.CombatMessagePostInfoRequest()).PostId =
				t),
			(t = await Net_1.Net.CallAsync(
				NetDefine_1.ERequestMessageId.CombatMessagePostInfoRequest,
				e,
			)),
			cpp_1.FuncOpenLibrary.SetIsCheckEncrypt(t?.PostInfo ?? ""));
	}
	static InitData(t, e, r) {
		return ModelManager_1.ModelManager.CharacterModel.InitData(t, e, r);
	}
	static Respawn(t, e, r = 0, a) {
		return ModelManager_1.ModelManager.CharacterModel.Respawn(t, e, r, a);
	}
	static AddEntityToAwakeQueue(t, e) {
		ModelManager_1.ModelManager.CharacterModel.AddEntityToAwakeQueue(t, e);
	}
	static ActivateEntity(t) {
		ModelManager_1.ModelManager.CharacterModel.ActivateEntity(t);
	}
	static Destroy(t) {
		return ModelManager_1.ModelManager.CharacterModel.Destroy(t);
	}
	static DestroyToLru(t) {
		return ModelManager_1.ModelManager.CharacterModel.DestroyToLru(t);
	}
	static CreateEntity(t, e) {
		return ModelManager_1.ModelManager.CharacterModel.CreateEntity(t, e);
	}
	static SpawnEntity(t) {
		return ModelManager_1.ModelManager.CharacterModel.SpawnEntity(t);
	}
	static GetCharacterActorComponent(t) {
		if (t?.Valid) {
			t = t.GetComponent(3);
			if (t.Valid && t.Actor) return t;
		}
	}
	static GetCharacterActorComponentById(t) {
		t = EntitySystem_1.EntitySystem.Get(t);
		if (t?.Valid) {
			t = t.GetComponent(3);
			if (t?.Valid) return t;
		}
	}
	static GetCharacter(t) {
		return t?.Valid && (t = t.GetComponent(3))?.Valid && t.Actor
			? t.Actor
			: void 0;
	}
	static GetActor(t) {
		return t?.Valid && (t = this.GetActorComponent(t)) ? t.Owner : void 0;
	}
	static GetActorByEntity(t) {
		return t?.Valid && (t = t.GetComponent(1)) ? t.Owner : void 0;
	}
	static GetActorComponent(t) {
		let e = t.Entity.GetComponent(181);
		return (e = e || t.Entity.GetComponent(2));
	}
	static GetTsBaseCharacterByEntity(t) {
		return t.Entity.GetComponent(3)?.Actor;
	}
	static GetUeTsBaseCharacterByEntity(t) {
		t = t.GetComponent(3);
		if (t) return t.Actor;
	}
	static GetEntityByUeTsBaseCharacter(t) {
		return t.CharacterActorComponent.Entity;
	}
	static SetTimeDilation(t) {
		var e = ModelManager_1.ModelManager.CreatureModel;
		for (const r of e.GetAllEntities()) r.IsInit && r.Entity.SetTimeDilation(t);
		for (const a of e.DelayRemoveContainer.GetAllEntities())
			a.IsInit && a.Entity.SetTimeDilation(t);
	}
	static CN() {
		return (
			!this.nHr &&
			0 === ModelManager_1.ModelManager.CharacterModel.AwakeQueue.Size
		);
	}
	static AwakeEntity() {
		var t = ModelManager_1.ModelManager.CharacterModel;
		if (this.nHr) {
			var e = this.nHr[2];
			if (((this.nHr = void 0), e())) return;
		}
		if (t.AwakeQueue.Size)
			for (var r; (r = t.PopAwakeHandler()); )
				if ((0, r[1])()) return void (this.nHr = r);
	}
	static SortItem(t) {
		!t?.Valid ||
			2 & t.Entity.Flag ||
			t.Entity.GetComponent(0).GetRemoveState() ||
			ModelManager_1.ModelManager.CharacterModel.SortItem(t);
	}
	static OnChangeMode() {
		if (!ModelManager_1.ModelManager.GameModeModel.IsMulti)
			for (const t of ModelManager_1.ModelManager.CreatureModel.GetAllEntities())
				t.Entity.GetComponent(38)?.SwitchControl(!0);
		return !0;
	}
}
(CharacterController.IsTickEvenPausedInternal = !0),
	(CharacterController.nHr = void 0),
	(CharacterController.FCn = void 0),
	(CharacterController.rHr = () => CharacterController.CN()),
	(CharacterController.oHr = () => {
		CharacterController.AwakeEntity();
	}),
	__decorate(
		[(0, Stats_1.statDecorator)("CharacterController.AwakeEntity")],
		CharacterController,
		"AwakeEntity",
		null,
	),
	(exports.CharacterController = CharacterController);
//# sourceMappingURL=CharacterController.js.map