"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (t, e, n, o) {
		var a,
			i = arguments.length,
			r =
				i < 3
					? e
					: null === o
						? (o = Object.getOwnPropertyDescriptor(e, n))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			r = Reflect.decorate(t, e, n, o);
		else
			for (var s = t.length - 1; 0 <= s; s--)
				(a = t[s]) && (r = (i < 3 ? a(r) : 3 < i ? a(e, n, r) : a(e, n)) || r);
		return 3 < i && r && Object.defineProperty(e, n, r), r;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PawnInfoManageComponent = void 0);
const LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem"),
	Log_1 = require("../../../../Core/Common/Log"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
	PublicUtil_1 = require("../../../Common/PublicUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	SOCKET_NAME = "MarkCase";
let PawnInfoManageComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.he = ""),
			(this.Vpr = void 0),
			(this.Ran = void 0),
			(this.Aan = void 0),
			(this.Uan = -1),
			(this.bor = void 0),
			(this.d6s = void 0);
	}
	OnInit() {
		return (
			(this.Vpr = this.Entity.GetComponent(0)),
			(this.Ran = this.Entity.GetComponent(133)),
			!0
		);
	}
	get LockRange() {
		return this.Uan;
	}
	get PawnName() {
		return (
			this.bor !== LanguageSystem_1.LanguageSystem.PackageLanguage &&
				this.sdo(),
			this.he
		);
	}
	set PawnName(t) {
		this.he = t;
	}
	SetPawnNameKey(t) {
		(this.d6s = t), this.sdo();
	}
	sdo() {
		var t;
		(this.bor = LanguageSystem_1.LanguageSystem.PackageLanguage),
			this.d6s
				? (this.he = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
						this.d6s,
					))
				: this.Ran?.DropItemConfig
					? ((t = this.Ran.DropItemConfig.Config),
						(this.he = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
							t.Name,
						)))
					: this.Aan &&
						((t = this.Vpr.GetBaseInfo()),
						(this.he = PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidName)));
	}
	get DropItemId() {
		return this.Ran?.DropItemConfig?.ConfigId;
	}
	get DropItemCount() {
		return this.Ran?.DropItemConfig.ItemCount;
	}
	get EntityId() {
		return this.Entity.Id;
	}
	get HasQuestOption() {
		var t = this.Entity.GetComponent(178);
		return !!t && !!(t = t.GetInteractController()) && t.HasDynamicOption;
	}
	Pan() {
		var t;
		return (
			(this.Aan = this.Vpr.GetPbEntityInitData()),
			this.Aan
				? ((t = this.Vpr.GetBaseInfo()),
					(this.he = PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidName)),
					(t = (0, IComponent_1.getComponent)(
						this.Aan.ComponentsData,
						"FightInteractComponent",
					)),
					(this.Uan = t ? t.LockRange : -1),
					!0)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Character",
							29,
							"[清理CDT_EntityConfig]该实体没有对应的Pb表信息",
							["CreatureDataId", this.Vpr.GetCreatureDataId()],
							["TidName", this.Vpr.GetBaseInfo()?.TidName],
							["PbDataId", this.Vpr.GetPbDataId()],
						),
					!1)
		);
	}
	OnStart() {
		return this.Pan() && this.sdo(), !0;
	}
	IsDropItem() {
		return void 0 !== this.Ran;
	}
	GetMessageId() {
		var t = this.Vpr.GetBaseInfo();
		return t?.HeadInfo ? t.HeadInfo : 0;
	}
	GetHeadStateSocketName() {
		var t =
			this.Entity.GetComponent(0)?.GetBaseInfo()?.HeadStateViewConfig
				?.HeadStateSocketName;
		return t || "MarkCase";
	}
	GetHeadStateOffset() {
		var t = this.Vpr.GetBaseInfo()?.HeadStateViewConfig?.ZOffset;
		return (
			t ||
			((t = this.Entity.GetComponent(0)?.GetModelConfig()) ? t.名字Z偏移 : 0)
		);
	}
};
(PawnInfoManageComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(102)],
	PawnInfoManageComponent,
)),
	(exports.PawnInfoManageComponent = PawnInfoManageComponent);
