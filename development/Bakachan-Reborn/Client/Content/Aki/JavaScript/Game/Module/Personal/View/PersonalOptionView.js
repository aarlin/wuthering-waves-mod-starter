"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PersonalOptionView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	PlayerHeadItem_1 = require("../../Common/PlayerHeadItem"),
	GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	PersonalOptionItem_1 = require("./PersonalOptionItem");
class PersonalOptionView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.H6t = void 0),
			(this.g6t = void 0),
			(this.J6t = (e, t, n) => (
				(t = new PersonalOptionItem_1.PersonalOptionItem(t)).Refresh(e, !1, n),
				{ Key: n, Value: t }
			)),
			(this.m7t = () => {
				this.RefreshOptions();
			}),
			(this.l7t = () => {
				this.Kbe();
			}),
			(this.jUt = () => {
				this.x9e();
			}),
			(this.WUt = () => {
				this.r8t();
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UISprite],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UIText],
			[5, UE.UIText],
			[6, UE.UIButtonComponent],
			[7, UE.UIText],
			[8, UE.UIItem],
			[9, UE.UIGridLayout],
			[10, UE.UIText],
			[11, UE.UIText],
		];
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnBirthChange,
			this.m7t,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnHeadIconChange,
				this.l7t,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnNameChange,
				this.jUt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSignChange,
				this.WUt,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnBirthChange,
			this.m7t,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnHeadIconChange,
				this.l7t,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnNameChange,
				this.jUt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSignChange,
				this.WUt,
			);
	}
	OnStart() {
		(this.g6t = new PlayerHeadItem_1.PlayerHeadItem(
			this.GetItem(0).GetOwner(),
		)),
			this.RefreshOptions(),
			this.x9e(),
			this.r8t();
		var e = ModelManager_1.ModelManager.FunctionModel.GetPlayerLevel();
		e && this.GetText(5).SetText(String(e)),
			this.Kbe(),
			this.GetText(4).SetText(""),
			LguiUtil_1.LguiUtil.SetLocalText(this.GetText(10), "SetPersonalData");
	}
	OnAfterShow() {}
	Kbe() {
		var e = ModelManager_1.ModelManager.PlayerInfoModel.GetHeadIconId();
		this.g6t.RefreshByRoleId(e);
	}
	x9e() {
		var e = ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
		e && this.GetText(2).SetText(e);
	}
	r8t() {
		var e = ModelManager_1.ModelManager.PersonalModel.GetSignature(),
			t = this.GetText(11);
		e && "" !== e
			? t.SetText(e)
			: LguiUtil_1.LguiUtil.SetLocalText(t, "EmptySign");
	}
	RefreshOptions() {
		var e = [];
		e.push(6),
			ModelManager_1.ModelManager.FunctionModel.IsOpen(10061) && e.push(7),
			e.push(8),
			e.push(9),
			e.push(10),
			e.push(11),
			this.H6t ||
				(this.H6t = new GenericLayoutNew_1.GenericLayoutNew(
					this.GetGridLayout(9),
					this.J6t,
				)),
			this.H6t.ClearChildren(),
			this.H6t.RebuildLayoutByDataNew(e);
	}
	OnBeforeDestroy() {
		this.H6t && (this.H6t.ClearChildren(), (this.H6t = void 0));
	}
}
exports.PersonalOptionView = PersonalOptionView;
