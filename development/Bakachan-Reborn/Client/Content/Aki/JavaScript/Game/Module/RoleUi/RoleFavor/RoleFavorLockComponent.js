"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleFavorLockComponent = exports.initLockItem = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	RoleFavorDefine_1 = require("./RoleFavorDefine"),
	RoleFavorLockItem_1 = require("./RoleFavorLockItem"),
	initLockItem = (e, o, t) => ({
		Key: t,
		Value: new RoleFavorLockItem_1.RoleFavorLockItem(o, e),
	});
exports.initLockItem = initLockItem;
class RoleFavorLockComponent extends UiPanelBase_1.UiPanelBase {
	constructor(e, o) {
		super(),
			(this.E_i = void 0),
			(this.c_o = []),
			(this.m_o = o),
			e && this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIVerticalLayout],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
		];
	}
	OnStart() {
		this.nOe();
	}
	OnBeforeDestroy() {
		(this.m_o = void 0), this.d_o(), (this.c_o = []);
	}
	Refresh(e) {
		(this.m_o = e), this.d_o(), (this.c_o = []), this.nOe();
	}
	nOe() {
		this.LBt(), this.C_o(), this.g_o();
	}
	d_o() {
		this.E_i && (this.E_i.ClearChildren(), (this.E_i = void 0));
	}
	g_o() {
		(this.E_i = new GenericLayoutNew_1.GenericLayoutNew(
			this.GetVerticalLayout(0),
			exports.initLockItem,
			this.GetItem(5),
		)),
			(this.c_o = this.f_o()),
			this.E_i.RebuildLayoutByDataNew(this.c_o);
	}
	LBt() {
		var e = this.p_o();
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), e);
	}
	C_o() {
		var e = this.GetItem(4),
			o = this.GetItem(3);
		2 === this.m_o.FavorTabType && 1 === this.m_o.TypeParam
			? (e.SetUIActive(!0),
				o.SetUIActive(!0),
				LguiUtil_1.LguiUtil.SetLocalText(
					this.GetText(1),
					"FavorUnlockNewIdleAction",
				))
			: (e.SetUIActive(!1), o.SetUIActive(!1));
	}
	p_o() {
		let e = "";
		switch (this.m_o.FavorTabType) {
			case 2:
				e = "FavorUnlockActionCondition";
				break;
			case 1:
				e = "FavorUnlockkStoryCondition";
				break;
			case 3:
				e = "FavorUnlockPreciousItemCondition";
				break;
			case 0:
				e = "FavorUnlockVoiceCondition";
		}
		return e;
	}
	f_o() {
		let e = [];
		var o = this.m_o.Config,
			t = this.m_o.FavorTabType,
			i = o.Id;
		o = o.CondGroupId;
		return 2 !== t && 1 !== t && 3 !== t && 0 !== t ? e : this.v_o(i, o);
	}
	v_o(e, o) {
		var t = [],
			i = this.m_o.RoleId,
			n = this.m_o.FavorTabType;
		if (
			(o =
				ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(
					o,
				))
		) {
			var r = o.GroupId,
				a = r.length;
			for (let o = 0; o < a; o++) {
				var s = r[o],
					l =
						ConfigManager_1.ConfigManager.ConditionConfig.GetConditionConfig(s);
				let a = !1;
				(a =
					2 === n
						? ModelManager_1.ModelManager.MotionModel.IsCondtionFinish(i, e, s)
						: ModelManager_1.ModelManager.RoleFavorConditionModel.IsCondtionFinish(
								i,
								n,
								e,
								s,
							)),
					(s = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
						l.Description,
					)),
					t.push(new RoleFavorDefine_1.RoleFavorLockItemData(!a, s ?? ""));
			}
		}
		return t;
	}
}
exports.RoleFavorLockComponent = RoleFavorLockComponent;
