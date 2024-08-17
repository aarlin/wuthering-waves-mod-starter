"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleAttrListScrollItem = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	RoleDefine_1 = require("../RoleDefine");
class RoleAttrListScrollItem extends UiPanelBase_1.UiPanelBase {
	constructor(e, t) {
		super(),
			(this.EPe = void 0),
			(this.Pe = void 0),
			(this.r7e = () =>
				!!ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
					this.Pe.Id,
				).Dec),
			(this.ToggleEvent = (e) => {
				(e = 1 === e),
					this.GetText(8).SetUIActive(e),
					this.GetItem(7).SetUIActive(e),
					(e = e ? "Show" : "Hide"),
					this.EPe &&
						(this.EPe.StopCurrentSequence(),
						this.EPe.PlayLevelSequenceByName(e));
			}),
			(this.S9 = t),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UISprite],
			[2, UE.UITexture],
			[3, UE.UIText],
			[4, UE.UIText],
			[5, UE.UIText],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this.ToggleEvent]]);
	}
	OnStart() {
		var e = this.GetExtendToggle(0);
		e.RootUIComp.SetUIActive(!0),
			e.CanExecuteChange.Unbind(),
			e.CanExecuteChange.Bind(this.r7e),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			this.GetItem(7).SetUIActive(!1);
	}
	OnBeforeDestroy() {
		this.EPe && (this.EPe.Clear(), (this.EPe = void 0));
	}
	ShowTemp(e, t) {
		(this.GetSprite(1).useChangeColor = t % 2 == 1),
			(t = e),
			(this.Pe = t),
			this.SetAttrValue(t),
			(e =
				ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
					t.Id,
				))
				? (this.GetText(3).ShowTextNew(e.Name),
					this.SetTextureByPath(e.Icon, this.GetTexture(2)),
					e.Dec
						? (this.GetItem(6).SetUIActive(!0),
							this.GetText(8).ShowTextNew(e.Dec))
						: this.GetItem(6).SetUIActive(!1))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("Role", 38, "属性表中找不到对应的属性ID配置数据");
	}
	SetAttrValue(e) {
		let t, i;
		var r, o;
		e.Id === RoleDefine_1.HP_ATTR_ID ||
		e.Id === RoleDefine_1.ATTACK_ATTR_ID ||
		e.Id === RoleDefine_1.DEF_ATTR_ID
			? ((t = e.BaseValue), (i = e.AddValue))
			: (t =
					e.Id === RoleDefine_1.STRENGTH_MAX_ID
						? (e.BaseValue + e.AddValue) / 100
						: e.BaseValue + e.AddValue),
			1 === this.S9
				? ((r = e.BaseValue + e.AddValue),
					(i = e.Id === RoleDefine_1.STRENGTH_MAX_ID ? r / 100 : r),
					this.GetText(4).SetText(
						ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
							e.Id,
							i,
						),
					),
					this.GetText(5).SetUIActive(!1))
				: (this.GetText(4).SetText(
						ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
							e.Id,
							t,
							e.IsRatio,
						),
					),
					(r = this.GetText(5)),
					i
						? ((o = 0 <= i ? "+" : StringUtils_1.EMPTY_STRING),
							r.SetText(
								o +
									ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
										e.Id,
										e.AddValue,
										e.IsRatio,
									),
							),
							r.SetUIActive(!0))
						: r.SetUIActive(!1));
	}
}
exports.RoleAttrListScrollItem = RoleAttrListScrollItem;
