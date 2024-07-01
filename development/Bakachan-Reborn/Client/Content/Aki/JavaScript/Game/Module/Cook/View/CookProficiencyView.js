"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ProficiencyView = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	CookController_1 = require("../CookController");
class ProficiencyView extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.uqt = void 0),
			(this.Gft = void 0),
			(this.OnChangeRoleClick = () => {
				this?.uqt();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UITexture],
			[2, UE.UIButtonComponent],
			[3, UE.UIText],
		]),
			(this.BtnBindInfo = [[2, this.OnChangeRoleClick]]);
	}
	OnStart() {
		this.Gft = new LevelSequencePlayer_1.LevelSequencePlayer(
			this.GetButton(2).RootUIComp,
		);
	}
	OnBeforeDestroy() {
		this.Gft.Clear();
	}
	BindChangeRoleClick(e) {
		this.uqt = e;
	}
	SetExpNum(e, t, i, n) {
		var o = (i = t * i) - (e = e * t);
		e = StringUtils_1.StringUtils.Format(
			ConfigManager_1.ConfigManager.TextConfig.GetTextById(
				"CumulativeProficiency",
			),
			e.toString(),
			i.toString(),
		);
		0 < o
			? ((i = Math.min(o, t * n)),
				(t = StringUtils_1.StringUtils.Format(
					ConfigManager_1.ConfigManager.TextConfig.GetTextById(
						"AddProficiency",
					),
					"+" + Math.min(i, o),
				).concat(" ", "(", e, ")")),
				this.GetText(0).SetText(t))
			: ((n = StringUtils_1.StringUtils.Format(
					ConfigManager_1.ConfigManager.TextConfig.GetTextById(
						"AddProficiency",
					),
					"",
				).concat(" ", "(", e, ")")),
				this.GetText(0).SetText(n));
	}
	SetRoleTexture(e, t) {
		var i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
		this.SetRoleIcon(
			i.GetRoleConfig().RoleHeadIconLarge,
			this.GetTexture(1),
			e,
		),
			CookController_1.CookController.CheckIsBuffEx(e, t)
				? this.Gft.GetCurrentSequence()
					? this.Gft.ReplaySequenceByKey("Show")
					: this.Gft.PlayLevelSequenceByName("Show")
				: this.Gft?.StopCurrentSequence(!1, !0);
	}
	SetTypeContent(e = void 0) {
		var t = this.GetText(3);
		e ? (t.SetUIActive(!0), t.SetText(e)) : t.SetUIActive(!1);
	}
}
exports.ProficiencyView = ProficiencyView;
