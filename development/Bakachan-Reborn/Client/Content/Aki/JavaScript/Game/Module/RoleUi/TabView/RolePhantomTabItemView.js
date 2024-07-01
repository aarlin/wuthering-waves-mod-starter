"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleMainPhantomItem =
		exports.RolePhantomItem =
		exports.RolePhantomAttributeItem =
			void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class RolePhantomAttributeItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UITexture],
		];
	}
	ShowTemp(e) {
		var t =
			ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
				e.Id,
			);
		t
			? (this.GetText(0).ShowTextNew(t.Name),
				this.SetTextureByPath(t.Icon, this.GetTexture(2)),
				this.GetText(1).SetText(
					ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
						e.Id,
						e.Value,
					),
				))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Role", 8, "属性表中找不到对应的属性ID配置数据");
	}
}
exports.RolePhantomAttributeItem = RolePhantomAttributeItem;
class RolePhantomItem extends UiPanelBase_1.UiPanelBase {
	constructor(e, t, o) {
		super(),
			(this.Id = 0),
			(this.OnClick = () => {
				this.ClickFunction && this.ClickFunction(this.Index);
			}),
			(this.OnClickSkillButton = () => {
				var e =
					ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleInstance()
						.GetPhantomData()
						.GetDataByIndex(this.Index);
				e = {
					SkillInfoData: 0,
					SkillId: this.Id,
					SkillLevel: e.GetPhantomLevel(),
				};
				UiManager_1.UiManager.OpenView("PhantomBattleSkillInfoView", e);
			}),
			this.CreateThenShowByActor(e.GetOwner()),
			(this.ClickFunction = t),
			(this.Index = o);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UITexture],
			[2, UE.UISprite],
			[4, UE.UIItem],
			[5, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this.OnClick]]);
	}
	UpdateItem(e) {
		(this.Id = e), this.Kbe(), this.Pqt(), this.sct();
	}
	UpdateTrialItem(e) {
		var t;
		this.GetSprite(2).SetUIActive(0 !== e),
			this.GetTexture(1).SetUIActive(0 !== e),
			this.GetItem(4).SetUIActive(0 !== e),
			0 !== e &&
				((t =
					ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e)),
				(t = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
					t.QualityId,
				)),
				this.SetSpriteByPath(t.BackgroundSprite, this.GetSprite(2), !1),
				this.SetItemIcon(this.GetTexture(1), e),
				this.odo());
	}
	Kbe() {
		var e;
		this.GetTexture(1).SetUIActive(0 !== this.Id),
			0 !== this.Id &&
				(e =
					ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
						this.Id,
					)) &&
				this.SetItemIcon(this.GetTexture(1), e.GetConfigId());
	}
	Pqt() {
		var e;
		this.GetSprite(2).SetUIActive(0 !== this.Id),
			0 !== this.Id &&
				((e =
					ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
						this.Id,
					)),
				(e = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
					e.GetQuality(),
				)),
				this.SetSpriteByPath(e.BackgroundSprite, this.GetSprite(2), !1));
	}
	sct() {
		this.GetItem(4).SetUIActive(0 !== this.Id), 0 !== this.Id && this.odo();
	}
	odo() {
		var e =
			ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleInstance();
		e &&
			((e = e.GetPhantomData().GetDataByIndex(this.Index))
				? this.GetText(5).SetText(e.GetPhantomLevel().toString())
				: this.GetItem(4).SetUIActive(!1));
	}
}
class RoleMainPhantomItem extends (exports.RolePhantomItem = RolePhantomItem) {
	constructor() {
		super(...arguments), (this.rdo = void 0);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UITexture],
			[2, UE.UISprite],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this.OnClick]]);
	}
	OnStart() {
		this.rdo = new SkillButtonCompose(this.GetItem(3), this.OnClickSkillButton);
	}
	UpdateItem(e) {
		super.UpdateItem(e), this.rdo.Update(e);
	}
}
exports.RoleMainPhantomItem = RoleMainPhantomItem;
class SkillButtonCompose extends UiPanelBase_1.UiPanelBase {
	constructor(e, t) {
		super(),
			(this.xe = 0),
			(this.Kyt = () => {
				this.EBt && this.EBt();
			}),
			(this.EBt = t),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[1, UE.UIButtonComponent],
			[0, UE.UITexture],
		]),
			(this.BtnBindInfo = [[1, this.Kyt]]);
	}
	Update(e) {
		(this.xe = e),
			0 !== this.xe &&
			ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsMain(
				this.xe,
			)
				? (this.SetActive(!0), this.RefreshTexture())
				: this.SetActive(!1);
	}
	RefreshTexture() {
		var e =
			ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
				this.xe,
			);
		e =
			ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
				e.GetConfigId(),
			);
		this.SetTextureByPath(
			e.GetPhantomSkillInfoByLevel().BattleViewIcon,
			this.GetTexture(0),
		);
	}
}
