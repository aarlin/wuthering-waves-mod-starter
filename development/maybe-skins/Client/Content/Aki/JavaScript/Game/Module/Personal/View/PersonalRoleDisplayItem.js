"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PersonalRoleDisplayItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class PersonalRoleDisplayItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor(e) {
		super(),
			(this.zke = 0),
			(this.LZt = 0),
			(this.Zqe = void 0),
			(this.jbe = (e) => {
				this.Zqe(this.zke, this.LZt);
			}),
			e && this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UISprite],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UIText],
			[5, UE.UITexture],
			[7, UE.UIItem],
			[8, UE.UIText],
			[9, UE.UIButtonComponent],
			[10, UE.UIItem],
			[11, UE.UIItem],
			[12, UE.UIItem],
		]),
			(this.BtnBindInfo = [[9, this.jbe]]);
	}
	Refresh(e, t, i) {
		this.InitAllItemState(),
			(this.zke = e),
			(this.LZt = i),
			this.GetTexture(0).SetUIActive(-1 !== this.zke),
			-1 !== this.zke &&
				((e =
					void 0 !==
					ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.zke)),
				this.GetItem(12).SetUIActive(!e),
				(i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.zke)),
				this.SetTextureByPath(i.RoleHeadIconBig, this.GetTexture(0)),
				this.Jke());
	}
	Jke() {
		var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
			this.zke,
		).QualityId;
		e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleQualityInfo(e);
		this.SetSpriteByPath(e.Image, this.GetSprite(1), !1);
	}
	ShowLevelText() {
		var e = this.GetText(2),
			t =
				(e.SetUIActive(!0),
				ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.zke));
		t &&
			(t = t.GetLevelData()) &&
			((t = t.GetLevel()), LguiUtil_1.LguiUtil.SetLocalText(e, "LevelShow", t));
	}
	ShowNameText() {
		var e = this.GetText(4),
			t =
				(e.SetUIActive(!0),
				ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.zke));
		t && e.ShowTextNew(t.Name);
	}
	InitAllItemState() {
		this.GetText(2).SetUIActive(!1),
			this.GetItem(3).SetUIActive(!1),
			this.GetText(4).SetUIActive(!1),
			this.GetTexture(5).SetUIActive(!1),
			this.GetItem(7).SetUIActive(!1),
			this.GetText(8).SetUIActive(!1),
			this.GetItem(10).SetUIActive(!1),
			this.GetItem(11).SetUIActive(!1);
	}
	SetToggleState(e) {}
	SetClickCallback(e) {
		this.Zqe = e;
	}
	GetRoleId() {
		return this.zke;
	}
	GetGirdIndex() {
		return this.LZt;
	}
	SetUseState(e) {
		this.GetItem(10).SetUIActive(e);
	}
	SetSelectState(e, t = 0) {}
}
exports.PersonalRoleDisplayItem = PersonalRoleDisplayItem;
