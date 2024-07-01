"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ConfirmButtonCompose = exports.ComposeTipsView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	GenericLayoutNew_1 = require("../../../Util/Layout/GenericLayoutNew"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	CommonItemView_1 = require("../../Common/CommonItemView"),
	ComposeController_1 = require("../ComposeController"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
class ComposeTipsView extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.dqt = void 0),
			(this.tNt = void 0),
			(this.iNt = void 0),
			(this.XIi = void 0),
			(this.rNt = (e, t, i) => (
				(t = new CommonItemView_1.MaterialItem(t)).Update(e),
				t.BindOnClickedCallback(this.x$e),
				{ Key: i, Value: t }
			)),
			(this.x$e = (e) => {
				e.m3n &&
					ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
						e.G3n,
					);
			}),
			(this.nNt = () => {
				switch (
					ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType
				) {
					case 1:
						var e = this.dqt;
						35 === e.SubType
							? ((t =
									ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaByFormulaItemId(
										e.ItemId,
									)),
								ComposeController_1.ComposeController.SendSynthesisFormulaUnlockRequest(
									t.Id,
								))
							: EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.OpenCompose,
									e.ItemId,
								);
						break;
					case 2:
						var t = this.dqt;
						37 === t.SubType
							? ((e =
									ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaByFormulaItemId(
										t.ItemId,
									)),
								ComposeController_1.ComposeController.SendSynthesisFormulaUnlockRequest(
									e.Id,
								))
							: EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.OpenCompose,
									t.ItemId,
								);
						break;
					case 3:
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OpenCompose,
							this.dqt.ItemId,
						);
				}
			}),
			(this.eGt = () => {
				this.XIi && this.XIi();
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UITexture],
			[2, UE.UIText],
			[3, UE.UIText],
			[6, UE.UIItem],
			[8, UE.UIItem],
			[12, UE.UIText],
			[14, UE.UIText],
			[15, UE.UIText],
			[16, UE.UIText],
			[17, UE.UIItem],
			[18, UE.UIHorizontalLayout],
			[19, UE.UIItem],
			[20, UE.UIItem],
			[21, UE.UIVerticalLayout],
			[22, UE.UIText],
			[23, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[23, this.eGt]]);
	}
	OnStart() {
		(this.tNt = new ConfirmButtonCompose(this.GetItem(8))),
			this.tNt.BindClickFunction(this.nNt),
			(this.iNt = new GenericLayoutNew_1.GenericLayoutNew(
				this.GetHorizontalLayout(18),
				this.rNt,
			));
	}
	OnBeforeDestroy() {
		this.iNt && (this.iNt.ClearChildren(), (this.iNt = void 0)),
			(this.XIi = void 0);
	}
	RefreshTips(e) {
		switch ((this.dqt = e).MainType) {
			case 1:
				this.$Ii();
				break;
			case 2:
				this.RefreshStructureData();
				break;
			case 3:
				this.RefreshPurificationData();
		}
	}
	$Ii() {
		var e = this.dqt;
		switch (e.SubType) {
			case 35:
				this.YIi(), this.JIi(e);
				break;
			case 0:
				this.zIi(), this.LIi(e);
		}
	}
	JIi(e) {
		var t =
				ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaByFormulaItemId(
					e.ItemId,
				),
			i =
				(this.mNt(1),
				ConfigManager_1.ConfigManager.TextConfig.GetTextById("Formula"));
		this.dNt(i),
			(i = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(t.Name)),
			this.CNt(i),
			(i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e.ItemId)),
			this.gNt(i.Icon),
			(e = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(
				t.ComposeContent,
			)),
			this.fNt(e),
			(i = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(
				t.ComposeBackground,
			)),
			this.pNt(i),
			this.vNt(!0),
			(e = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Study"));
		this.rFe(e, !0);
	}
	LIi(e) {
		var t = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
				e.ItemId,
			),
			i = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
				t.ItemId,
			),
			o =
				((i =
					(this.mNt(i),
					ConfigManager_1.ConfigManager.TextConfig.GetTextById("Medicament"))),
				(i =
					(this.dNt(i),
					ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(t.Name))),
				(i =
					(this.CNt(i),
					ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t.ItemId))),
				this.gNt(i.Icon),
				ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(
					i.AttributesDescription,
				));
		this.fNt(o),
			(o = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(
				i.BgDescription,
			)),
			this.pNt(o),
			(i = t.Proficiency),
			(o = t.MaxProficiencyCount),
			this.MNt(e.ComposeCount, i, o),
			(t = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Making")),
			(i = ComposeController_1.ComposeController.CheckCanReagentProduction(
				e.ItemId,
			));
		this.rFe(t, i), this.vNt(i), this.SNt(e.ItemId);
	}
	YIi() {
		this.GetText(3).SetUIActive(!0),
			this.GetText(12).SetUIActive(!0),
			this.GetItem(17).SetUIActive(!1),
			this.GetItem(19).SetUIActive(!0),
			this.GetItem(20).SetUIActive(!1),
			this.GetText(2).SetUIActive(!1),
			this.GetText(16).SetUIActive(!1);
	}
	zIi() {
		this.GetText(3).SetUIActive(!0),
			this.GetText(12).SetUIActive(!0),
			this.GetItem(17).SetUIActive(!0),
			this.GetItem(19).SetUIActive(!0),
			this.GetItem(20).SetUIActive(!1),
			this.GetText(2).SetUIActive(!0),
			this.GetText(16).SetUIActive(!0);
	}
	RefreshStructureData() {
		var e = this.dqt;
		switch (e.SubType) {
			case 37:
				this.ZIi(), this.RefreshStructureMenu(e);
				break;
			case 0:
				this.eTi(), this.RefreshStructure(e);
		}
	}
	RefreshStructure(e) {
		var t = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
				e.ItemId,
			),
			i = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
				t.ItemId,
			);
		this.mNt(i),
			(i = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Prop")),
			this.dNt(i),
			(i = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(t.Name)),
			this.CNt(i),
			(i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t.ItemId)),
			this.gNt(i.Icon),
			(t = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(
				i.AttributesDescription,
			)),
			this.fNt(t),
			(t = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(
				i.BgDescription,
			)),
			this.pNt(t),
			(i = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Making")),
			(t = ComposeController_1.ComposeController.CheckCanStructure(e.ItemId));
		this.rFe(i, t), this.vNt(t), this.SNt(e.ItemId);
	}
	RefreshStructureMenu(e) {
		var t =
				ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaByFormulaItemId(
					e.ItemId,
				),
			i =
				(this.mNt(1),
				ConfigManager_1.ConfigManager.TextConfig.GetTextById("Formula"));
		this.dNt(i),
			(i = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(t.Name)),
			this.CNt(i),
			(i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e.ItemId)),
			this.gNt(i.Icon),
			(e = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(
				t.ComposeContent,
			)),
			this.fNt(e),
			(i = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(
				t.ComposeBackground,
			)),
			this.pNt(i),
			this.vNt(!0),
			(e = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Study"));
		this.rFe(e, !0);
	}
	eTi() {
		this.GetText(3).SetUIActive(!0),
			this.GetText(12).SetUIActive(!0),
			this.GetItem(17).SetUIActive(!0),
			this.GetItem(19).SetUIActive(!0),
			this.GetItem(20).SetUIActive(!1),
			this.GetText(2).SetUIActive(!1),
			this.GetText(16).SetUIActive(!1);
	}
	ZIi() {
		this.GetText(3).SetUIActive(!0),
			this.GetText(12).SetUIActive(!0),
			this.GetItem(17).SetUIActive(!1),
			this.GetItem(19).SetUIActive(!0),
			this.GetItem(20).SetUIActive(!1),
			this.GetText(2).SetUIActive(!1),
			this.GetText(16).SetUIActive(!1);
	}
	RefreshPurificationData() {
		var e = this.dqt;
		this.SetPurificationHide(), this.RefreshPurification(e);
	}
	RefreshPurification(e) {
		var t = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
				e.ItemId,
			),
			i = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
				t.ItemId,
			),
			o =
				((i =
					(this.mNt(i),
					ConfigManager_1.ConfigManager.TextConfig.GetTextById("Material"))),
				(i =
					(this.dNt(i),
					ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(t.Name))),
				(i =
					(this.CNt(i),
					ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t.ItemId))),
				this.gNt(i.Icon),
				ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(
					i.AttributesDescription,
				));
		this.fNt(o),
			(o = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(
				i.BgDescription,
			));
		this.pNt(o);
		let n = "",
			a = !1;
		1 === e.IsUnlock
			? ((n = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Making")),
				(a = ComposeController_1.ComposeController.CheckCanPurification(
					e.ItemId,
				)),
				this.vNt(a))
			: ((i = ConfigManager_1.ConfigManager.ComposeConfig.GetConditionInfo(
					t.UnlockCondition,
				)),
				(n = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(
					i.HintText,
				)),
				(a = !1),
				this.vNt(!0)),
			this.rFe(n, a),
			this.SNt(e.ItemId);
	}
	SetPurificationHide() {
		this.GetText(3).SetUIActive(!0),
			this.GetText(12).SetUIActive(!0),
			this.GetItem(17).SetUIActive(!0),
			this.GetItem(19).SetUIActive(!0),
			this.GetItem(20).SetUIActive(!1),
			this.GetText(2).SetUIActive(!1),
			this.GetText(16).SetUIActive(!1);
	}
	CNt(e) {
		this.GetText(0).SetText(e);
	}
	gNt(e) {
		this.SetTextureByPath(e, this.GetTexture(1));
	}
	fNt(e) {
		this.GetText(3).SetText(e);
	}
	pNt(e) {
		this.GetText(12).SetText(e);
	}
	dNt(e) {
		this.GetText(15).SetText(e);
	}
	mNt(e) {
		LguiUtil_1.LguiUtil.SetLocalText(this.GetText(14), "Have", e);
	}
	MNt(e, t, i) {
		(e *= t) != (i *= t)
			? LguiUtil_1.LguiUtil.SetLocalText(
					this.GetText(2),
					"AddProficiency",
					"+" + t,
				)
			: LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "Proficiency"),
			LguiUtil_1.LguiUtil.SetLocalText(
				this.GetText(16),
				"CumulativeProficiency",
				e,
				i,
			);
	}
	rFe(e, t) {
		this.tNt.UpdateText(e), this.tNt.RefreshButton(t);
	}
	vNt(e) {
		this.GetButton(23).GetOwner().GetUIItem().SetUIActive(!e);
	}
	SNt(e) {
		this.iNt.RebuildLayoutByDataNew(
			ModelManager_1.ModelManager.ComposeModel.GetComposeMaterialList(e),
		);
	}
	BindOnDisable(e) {
		this.XIi = e;
	}
}
exports.ComposeTipsView = ComposeTipsView;
class ConfirmButtonCompose extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.Bqt = void 0),
			(this.Kyt = () => {
				this.Bqt();
			}),
			this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this.Kyt]]);
	}
	UpdateText(e) {
		this.GetText(1).SetText(e);
	}
	RefreshButton(e) {
		this.GetButton(0)
			.GetOwner()
			.GetComponentByClass(UE.UIInteractionGroup.StaticClass())
			.SetInteractable(e);
	}
	BindClickFunction(e) {
		this.Bqt = e;
	}
}
exports.ConfirmButtonCompose = ConfirmButtonCompose;
