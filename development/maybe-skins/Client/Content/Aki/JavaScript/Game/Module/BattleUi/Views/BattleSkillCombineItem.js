"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleSkillCombineItem = void 0);
const UE = require("ue"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
	CommonKeyItem_1 = require("./KeyItem/CommonKeyItem");
class BattleSkillCombineItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Uet = void 0),
			(this.Aet = void 0),
			(this.Pet = 0),
			(this.xet = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UINiagara],
		];
	}
	async OnBeforeStartAsync() {
		var e = this.GetItem(0);
		(this.xet = new CommonKeyItem_1.CommonKeyItem()),
			await this.xet.CreateThenShowByActorAsync(e.GetOwner()),
			this.xet.RefreshAction(InputMappingsDefine_1.actionMappings.组合主键);
	}
	OnStart() {
		this.GetUiNiagara(1).SetNiagaraUIActive(!1, !1);
	}
	SetVisible(e) {
		e
			? this.IsShowOrShowing || this.Show()
			: this.IsShowOrShowing && this.Hide();
	}
	OnBeforeDestroy() {
		this.wet();
	}
	RefreshDynamicEffect(e) {
		(e = this.Bet(e)),
			this.Uet !== e &&
				((this.Uet = e),
				this.Uet
					? this.Uet === this.Aet
						? this.bet(!0)
						: ((this.Aet = this.Uet),
							this.wet(),
							(this.Pet = ResourceSystem_1.ResourceSystem.LoadAsync(
								this.Aet,
								UE.NiagaraSystem,
								(e) => {
									var t;
									e?.IsValid() &&
										(t = this.GetUiNiagara(1)) &&
										(t.SetNiagaraSystem(e), this.Aet === this.Uet) &&
										this.bet(!0);
								},
							)))
					: this.bet(!1));
	}
	wet() {
		this.Pet &&
			(ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Pet),
			(this.Pet = void 0));
	}
	Bet(e) {
		if (
			e &&
			(e = e.GetDynamicEffectConfig()) &&
			((e = e.NiagaraPath), !StringUtils_1.StringUtils.IsEmpty(e))
		)
			return e;
	}
	bet(e) {
		var t = this.GetUiNiagara(1);
		t &&
			(e
				? (t.bIsUIActive || t.SetUIActive(!0), t.ActivateSystem(!0))
				: t.bIsUIActive && t.SetUIActive(!1));
	}
}
exports.BattleSkillCombineItem = BattleSkillCombineItem;
