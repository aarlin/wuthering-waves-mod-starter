"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SelectedFriendItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	FriendController_1 = require("../../Friend/FriendController"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	ChatDefine_1 = require("../ChatDefine");
class SelectedFriendItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.sSt = void 0),
			(this.Wgt = void 0),
			(this.MEt = () => {
				this.Wgt && this.Wgt(this.sSt.PlayerId);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UITexture],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIText],
			[5, UE.UIText],
			[6, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.MEt]]);
	}
	BindOnClicked(e) {
		this.Wgt = e;
	}
	OnBeforeDestroy() {
		this.Wgt = void 0;
	}
	Refresh(e, t, i) {
		(this.sSt = ModelManager_1.ModelManager.FriendModel.GetFriendById(e)),
			this.sSt && (this.SEt(), this.C4e(), this.sct(), this.EEt(), this.yEt());
	}
	SEt() {
		var e = this.sSt.PlayerHeadPhoto,
			t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleHeadIcon(e),
			i = this.GetTexture(1);
		this.SetRoleIcon(t, i, e);
	}
	C4e() {
		var e = this.GetText(2);
		(this.GetText(3)?.SetUIActive(!1), this.sSt.FriendRemark)
			? (e.SetText(this.sSt.FriendRemark),
				e?.SetColor(ChatDefine_1.playerMarkNameColor))
			: (e.SetText(this.sSt.PlayerName),
				e?.SetColor(ChatDefine_1.playerRealNameColor));
	}
	sct() {
		var e = this.sSt.PlayerLevel,
			t = this.GetText(5);
		LguiUtil_1.LguiUtil.SetLocalText(t, "LevelShow", e);
	}
	EEt() {
		var e = this.sSt.PlayerIsOnline,
			t = this.GetText(4),
			i = e ? "00D67E" : "D64600";
		i = UE.Color.FromHex(i);
		t.SetColor(i),
			e
				? LguiUtil_1.LguiUtil.SetLocalText(t, "FriendOnline")
				: 0 === this.sSt.PlayerLastOfflineTime
					? t.SetText("")
					: ((i = this.sSt.GetOfflineDay()),
						(e = FriendController_1.FriendController.GetOfflineTimeString(i)),
						LguiUtil_1.LguiUtil.SetLocalText(t, e, i));
	}
	yEt() {
		this.GetItem(6).SetUIActive(!1);
	}
}
exports.SelectedFriendItem = SelectedFriendItem;
