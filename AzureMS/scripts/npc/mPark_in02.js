


/*

	ǻ�� �¶��� �ҽ� ���� ��ũ��Ʈ �Դϴ�.

        ���� : ��ũ����

	���ǽþ��̵� : 9071004
	
	���ǽ� �̸� : ����Ʈ

	���ǽð� �ִ� �� : ������ũ

	���ǽ� ���� : in02 ��Ż ����Ʈ


*/


var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
    
    if (status == 0) {
	if (cm.getPlayer().getDateKey3("mP_00") == -1) cm.getPlayer().setDateKey3("mP_00", 0);
	if (cm.getPlayer().getDateKey3("mP_00") >= 100) {
		cm.sendOk("�Ϸ翡 3�� �̻� �̿��Ͻ� �� �����ϴ�.");
		cm.dispose();
		return;
	}
        var text = "��� ������ �����Ͻðڽ��ϱ�?\r\n#r(���� 160�̻� ���� �̿� ����)\r\n#b";
        	text += "#fs11##b#h #���� ������ũ �̿� ���� Ƚ�� : "+(3 - cm.getPlayer().getDateKey3("mP_00"))+"#k\r\n";
		text += "#L1#���㰡 �� ����(Lv.160~169)#l\r\n" +
		"#L2#���� ������ ��(Lv.170~179)#l\r\n" +
		"#L3#������ ž(Lv.175~184)#l\r\n" +
		"#L4#���� ����(Lv.180~189)#l\r\n" +
		"#L5#������ ����(Lv.185~194)#l\r\n" +
		"#L6#������ ���(Lv.190~199)#l\r\n" +
		"#L7#��ȥ�� ����(Lv.200~209)#l\r\n" +
		"#L8#�Ҹ��� ����(Lv.200~209)\r\n" +
		"#L9#���� ���Ϸ���(Lv.210~219)\r\n"
        cm.sendSimple(text);
    } else if (status == 1) {
        var map = 100000000;
        switch (selection) {
            case 1:
                map = 954000000;
                break;
            case 2:
                map = 954010000;
                break;
            case 3:
                map = 954020000;
                break;
            case 4:
                map = 954030000;
                break;
            case 5:
                map = 954040000;
                break;
            case 6:
                map = 954050000;
                break;
            case 7:
                map = 954060000;
                break;
			case 8:
                map = 954070000;
                break;
			case 9:
                map = 954080000;
                break;
        }
        
        
			for (var i = 0; i < 6; i ++) {
				if (cm.getPlayerCount(map + (i * 100)) > 0) {
					cm.sendOk("�̹� �ٸ� ��Ƽ�� ���� ��ũ�� �̿� �� �Դϴ�.");
					cm.dispose();
					return;
				}
			}
        var party = cm.getPlayer().getParty();
        if (party == null) {
            if (!checkLevel(cm.getPlayer().getLevel(), 160, 275)) {
                cm.sendOk("��Ƽ�� �� ������ ���� �ʴ� ��Ƽ���� �ֽ��ϴ�.\r\n#r160���� �̻�#k�� ��Ƽ���� ������ �� �ֽ��ϴ�.");
                cm.dispose();
                return;
            }
            if (!cm.haveItem(4001522, 1)) {
                cm.sendOk("��Ƽ�� �� ������� �������� ���� ��Ƽ���� �ֽ��ϴ�.\r\n#r#i4001522# #t4001522##k�� �־�� ������ �� �ֽ��ϴ�.");
                cm.dispose();
                return;
            }
            
            
            cm.gainItem(4001522, -1);
            var em = cm.getEventManager("MonsterPark");
            var eim = em.readyInstance();
            eim.setProperty("Global_StartMap", map);
            eim.setProperty("Global_ExitMap", "951000000");
            eim.setProperty("Global_MinPerson", "1");
            eim.setProperty("Global_RewardMap", "951000000");
            eim.setProperty("CurrentStage", "1");
            eim.startEventTimer(1200000);
            eim.registerPlayer(cm.getPlayer());
		cm.getPlayer().setDateKey3("mP_00", cm.getPlayer().getDateKey3("mP_00") + 1);
            cm.dispose();
        } else {
            if (!cm.isLeader()) {
                cm.sendOk("��Ƽ���� �����û�� �� �� �ֽ��ϴ�.");
                cm.dispose();
                return;
            }
            if (!cm.allMembersHere()) {
                cm.sendOk("��Ƽ���� ���� �̰��� ���־�� �մϴ�.");
                cm.dispose();
                return;
            }
            var it = cm.getClient().getChannelServer().getPartyMembers(cm.getParty()).iterator();
            var ticketPass = true;
            var levelPass = true;
            while (it.hasNext()) {
                var chr = it.next();
                if (!chr.haveItem(4001522, 1, false, true)) {
                    ticketPass = false;
                    break;
                }
                if (!checkLevel(chr.getLevel(), 160, 250)) {
                    levelPass = false;
                    break;
                }
            }
            if (!ticketPass) {
                cm.sendOk("��Ƽ�� �� ������� �������� ���� ��Ƽ���� �ֽ��ϴ�.\r\n#r#i4001522# #t4001522##k�� �־�� ������ �� �ֽ��ϴ�.");
                cm.dispose();
                return;
            }
            if (!levelPass) {
                cm.sendOk("��Ƽ�� �� ������ ���� �ʴ� ��Ƽ���� �ֽ��ϴ�.\r\n#r165���� �̻�#k�� ��Ƽ���� ������ �� �ֽ��ϴ�.");
                cm.dispose();
                return;
            }
            var toRem = cm.getClient().getChannelServer().getPartyMembers(cm.getParty()).iterator();
            while (toRem.hasNext()) {
                var chr = toRem.next();
                cm.gainItemTarget(chr, 4001522, -1);            }
            var em = cm.getEventManager("MonsterPark");
            var eim = em.readyInstance();
            eim.setProperty("Global_StartMap", map);
            eim.setProperty("Global_ExitMap", "951000000");
            eim.setProperty("Global_MinPerson", "1");
            eim.setProperty("Global_RewardMap", "951000000");
            eim.setProperty("CurrentStage", "1");
            eim.startEventTimer(1200000);
            eim.registerParty(cm.getPlayer().getParty(), cm.getPlayer().getMap());
		cm.getPlayer().setDateKey3("mP_00", cm.getPlayer().getDateKey3("mP_00") + 1);
            cm.dispose();
        }
    }
}


function checkLevel(cur, min, max) {
    return (cur >= min && cur <= max);
}